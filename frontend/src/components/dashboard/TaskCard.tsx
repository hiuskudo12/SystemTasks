

interface TaskCardProps {
    task: any;
    onEdit: (task: any) => void;
    onDelete: (id: number) => void;
    onStatusChange: (
        id: number,
        status: string
    ) => void;
}

const getPriorityColor = (priority: string) => {

    switch (priority) {

        case "high":
            return "bg-red-100 text-red-700";

        case "medium":
            return "bg-yellow-100 text-yellow-700";

        case "low":
            return "bg-green-100 text-green-700";

        default:
            return "bg-gray-100 text-gray-700";

    }

};

const getStatusColor = (status: string) => {

    switch (status) {

        case "completed":
            return "bg-green-100 text-green-700";

        case "pending":
            return "bg-yellow-100 text-yellow-700";

        case "skipped":
            return "bg-red-100 text-red-700";

        default:
            return "bg-gray-100 text-gray-700";

    }

};

export default function TaskCard({
    task,
    onEdit,
    onDelete,
    onStatusChange,
}: TaskCardProps) {

    const today = new Date();

today.setHours(0, 0, 0, 0);

const deadline = new Date(task.deadline);

deadline.setHours(0, 0, 0, 0);

const isOverdue =
    task.status === "pending" &&
    deadline < today;

    return (

        <div
    className={`rounded-2xl border bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
        isOverdue
            ? "border-red-500 border-2"
            : "border-gray-200"
    }`}
>

            <h3 className="text-lg font-semibold text-gray-900">

                {task.title}

            </h3>

            <p className="mt-2 text-gray-700">

                {task.description}

            </p>

            <div className="mt-4 flex flex-wrap gap-2">

<span
    className={`rounded px-3 py-1 text-sm font-medium ${
        task.priority === "high"
            ? "bg-red-100 text-red-700"
            : task.priority === "medium"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-green-100 text-green-700"
    }`}
>
    {task.priority}
</span>

<select
    value={task.status}
    onChange={(e) =>
        onStatusChange(
            task.task_id,
            e.target.value
        )
    }
    className={`rounded-lg border px-3 py-2 text-sm font-medium outline-none transition ${
        task.status === "completed"
            ? "border-green-300 bg-green-100 text-green-700"
            : task.status === "pending"
            ? "border-yellow-300 bg-yellow-100 text-yellow-700"
            : "border-red-300 bg-red-100 text-red-700"
    }`}
>
    <option value="pending">
        🟡 Đang thực hiện
    </option>

    <option value="completed">
        🟢 Hoàn thành
    </option>

    <option value="skipped">
        🔴 Đã bỏ qua
    </option>
</select>

            </div>

           <p className="mt-4 text-sm text-gray-700">
    📅 Deadline: {new Date(task.deadline).toLocaleString("vi-VN")}
</p>

{isOverdue && (
    <p className="mt-2 text-sm font-semibold text-red-600">
        ⚠️ Công việc đã quá hạn
    </p>
)}

            <div className="mt-5 flex justify-end gap-3">

    <button
        onClick={() => onEdit(task)}
        className="flex items-center gap-2 rounded-lg bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
    >
       ✏️ Sửa
    </button>

    <button
        onClick={() => onDelete(task.task_id)}
        className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
    >
       🗑 Xóa
    </button>

</div>

        </div>

    );

}