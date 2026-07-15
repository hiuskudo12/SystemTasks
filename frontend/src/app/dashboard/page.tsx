"use client";

import { useEffect, useState } from "react";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Header from "@/components/dashboard/Header";
import StatCard from "@/components/dashboard/StatCard";

import { getDashboard } from "@/services/dashboard.service";
import TaskList from "@/components/dashboard/TaskList";

import Modal from "@/components/common/Modal";
import TaskForm from "@/components/dashboard/TaskForm";
import Toast from "@/components/common/Toast";
import {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    updateStatus,
} from "@/services/task.service";
interface DashboardStats {
    totalTasks: number;
    pendingTasks: number;
    completedTasks: number;
    skippedTasks: number;
    overdueTasks: number;
}

export default function DashboardPage() {
    const [stats, setStats] = useState<DashboardStats>({
        totalTasks: 0,
        pendingTasks: 0,
        completedTasks: 0,
        skippedTasks: 0,
        overdueTasks: 0,
    });
    
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    
    const [open, setOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<any>(null);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("all");

    const [priorityFilter, setPriorityFilter] = useState("all");

    const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
}>({
    show: false,
    message: "",
    type: "success",
});

const showToast = (
    message: string,
    type: "success" | "error" = "success"
) => {

    setToast({
        show: true,
        message,
        type,
    });

    setTimeout(() => {

        setToast((prev) => ({
            ...prev,
            show: false,
        }));

    }, 2500);

};
 const fetchDashboard = async () => {

    try {

        const result = await getDashboard();

        setStats(result.data);

    } catch (error) {

        console.error(error);

    } finally {

        setLoading(false);

    }

};

const fetchTasks = async () => {

    try {

        console.log("👉 fetchTasks");

        const result = await getTasks();

        

        setTasks(result.data.tasks);

    } catch (error) {

        console.error(error);

    }

};

useEffect(() => {

    fetchDashboard();

    fetchTasks();

}, []);

    if (loading) {

        return (
            <ProtectedRoute>
                <div className="min-h-screen flex items-center justify-center text-lg">
                    Đang tải dữ liệu...
                </div>
            </ProtectedRoute>
        );

    }

    const filteredTasks = tasks.filter((task) => {

    const matchSearch =
        task.title.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
        statusFilter === "all" ||
        task.status === statusFilter;

    const matchPriority =
        priorityFilter === "all" ||
        task.priority === priorityFilter;

    return (
        matchSearch &&
        matchStatus &&
        matchPriority
    );

});

    return (

        <ProtectedRoute>
                    {toast.show && (

            <Toast

                message={toast.message}

                type={toast.type}

            />

        )}
            <main className="min-h-screen bg-gray-100 px-4 py-6 sm:px-6 lg:px-8">

                <Header />

                <h2 className="mt-8 mb-6 text-3xl font-extrabold text-gray-900">
                    📊 Tổng quan
                </h2>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <input
        type="text"
        placeholder="🔍 Tìm công việc..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
            w-full
            rounded-xl
            border
            border-gray-300
            bg-white
            px-4
            py-3
            text-gray-900
            placeholder:text-gray-500
            shadow-sm
            transition
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-200
            focus:outline-none
        "
    />
</div>

<div className="mb-6 flex flex-wrap gap-4">

<select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    className="
        rounded-xl
        border
        border-gray-300
        bg-white
        px-4
        py-2
        text-gray-900
        shadow-sm
        transition
        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-200
        focus:outline-none
    "
>
    <option value="all">📋 Tất cả trạng thái</option>
    <option value="pending">🟡 Đang thực hiện</option>
    <option value="completed">🟢 Hoàn thành</option>
    <option value="skipped">🔴 Đã bỏ qua</option>
</select>

<select
    value={priorityFilter}
    onChange={(e) => setPriorityFilter(e.target.value)}
    className="
        rounded-xl
        border
        border-gray-300
        bg-white
        px-4
        py-2
        text-gray-900
        shadow-sm
        transition
        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-200
        focus:outline-none
    "
>
    <option value="all">⭐ Tất cả ưu tiên</option>
    <option value="high">🔴 Cao</option>
    <option value="medium">🟡 Trung bình</option>
    <option value="low">🟢 Thấp</option>
</select>

</div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

                    <StatCard
                        title="📋 Tổng công việc"
                        value={stats.totalTasks}
                    />

                    <StatCard
                        title="⏳ Đang thực hiện"
                        value={stats.pendingTasks}
                    />

                    <StatCard
                        title="✅ Hoàn thành"
                        value={stats.completedTasks}
                    />

                    <StatCard
                        title="❌ Đã bỏ qua"
                        value={stats.skippedTasks}
                    />

                    <StatCard
                        title="⚠️ Quá hạn"
                        value={stats.overdueTasks}
                    />

                </div>

                <h2 className="mt-10 mb-4 text-3xl font-extrabold text-gray-900">
     📝 Danh sách công việc
</h2>

<div className="mt-8 flex justify-end">
<button
    onClick={() => {

        setEditingTask(null);

        setOpen(true);

    }}
    className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
>
    + Thêm công việc
</button>
</div>

<TaskList
    tasks={filteredTasks}
    onEdit={(task) => {
        setEditingTask(task);
        setOpen(true);
    }}
onDelete={async (id) => {

    const ok = confirm("Bạn có chắc muốn xóa công việc này?");

    if (!ok) return;

    try {

        await deleteTask(id);

        await Promise.all([
            fetchTasks(),
            fetchDashboard(),
        ]);

        showToast("Đã xóa công việc", "success");

    } catch (error) {

        console.error(error);

        showToast("Xóa công việc thất bại", "error");

    }

}}
    onStatusChange={async (id, status) => {
 try {
    await updateStatus(id, status);

    await Promise.all([
        fetchTasks(),
        fetchDashboard(),
    ]);

    showToast("Đã cập nhật trạng thái", "success");

} catch (error) {

    console.error(error);

    showToast("Cập nhật trạng thái thất bại", "error");

}
    }}
    
/>
<Modal
    open={open}
    title={editingTask ? "Sửa công việc" : "Thêm công việc"}
    onClose={() => setOpen(false)}
>
    <TaskForm
        initialData={editingTask}
        onSubmit={async (data) => {
            try {

if (editingTask) {

    await updateTask(editingTask.task_id, data);

    console.log("✅ Update thành công");

    showToast("Đã cập nhật công việc", "success");

} else {

    await createTask(data);

    console.log("✅ Create thành công");

    showToast("Đã thêm công việc", "success");
}

await Promise.all([
    fetchTasks(),
    fetchDashboard(),
]);

setEditingTask(null);
setOpen(false);


            } catch (error: any) {

    console.log("Error:", error);

    console.log("Response:", error.response);

    console.log("Data:", error.response?.data);

    alert(JSON.stringify(error.response?.data));

}
        }}
    />
</Modal>
</main>
        </ProtectedRoute>

    );

}