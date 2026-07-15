"use client";

import TaskCard from "./TaskCard";

interface TaskListProps {
    tasks: any[];
    onEdit: (task: any) => void;
    onDelete: (id: number) => void;
    onStatusChange: (
        id: number,
        status: string
    ) => void;
}
export default function TaskList({
    tasks,
    onEdit,
    onDelete,
    onStatusChange,
}: TaskListProps) {


    if (tasks.length === 0) {

    return (

        <div className="mt-12 rounded-2xl border-2 border-dashed border-gray-300 bg-white py-16 text-center shadow-sm">

            <div className="text-6xl">
                📝
            </div>

            <h3 className="mt-4 text-2xl font-bold text-gray-900">
                Chưa có công việc nào
            </h3>

            <p className="mt-2 text-gray-500">
                Hãy nhấn nút
                <span className="mx-1 font-semibold text-blue-900">
                    "Thêm công việc"
                </span>
                để bắt đầu quản lý công việc của bạn.
            </p>

        </div>

    );

}

    return (

        <div className="mt-8 space-y-4">

            {tasks.map((task) => (

<TaskCard
    key={task.task_id}
    task={task}
    onEdit={onEdit}
    onDelete={onDelete}
    onStatusChange={onStatusChange}
/>

            ))}

        </div>

    );

}