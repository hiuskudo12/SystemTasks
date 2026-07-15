"use client";

import { useEffect, useState } from "react";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";

interface Props{

    onSubmit:(data:any)=>void;

    initialData?:any;

}

export default function TaskForm({
    onSubmit,
    initialData,
}: Props) {

const [form,setForm]=useState({

    title:initialData?.title ?? "",

    description:initialData?.description ?? "",

    priority:initialData?.priority ?? "medium",

    deadline:initialData?.deadline
        ? initialData.deadline.slice(0,16)
        : "",

});
const [saving, setSaving] = useState(false);
useEffect(() => {

    if (initialData) {

        setForm({
            title: initialData.title,
            description: initialData.description,
            priority: initialData.priority,
            deadline: initialData.deadline
                ? initialData.deadline.slice(0, 16)
                : "",
        });

    } else {

        setForm({
            title: "",
            description: "",
            priority: "medium",
            deadline: "",
        });

    }

}, [initialData]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };

    return (

        <form
    className="space-y-4"
    onSubmit={async (e) => {

        e.preventDefault();

        setSaving(true);

        try {

            await onSubmit(form);

        } finally {

            setSaving(false);

        }

    }}
>

            <Input
                label="Tiêu đề"
                name="title"
                value={form.title}
                onChange={handleChange}
            />

<textarea
    name="description"
    value={form.description}
    onChange={handleChange}
    placeholder="Nhập mô tả..."
    className="
        w-full
        rounded-xl
        border
        border-gray-300
        bg-white
        p-3
        text-gray-900
        placeholder:text-gray-500
        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-200
        focus:outline-none
    "
/>

            <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="
    w-full
    rounded-xl
    border
    border-gray-300
    bg-white
    p-3
    text-gray-900
    focus:border-blue-500
    focus:ring-2
    focus:ring-blue-200
    focus:outline-none
"
            >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
            </select>

            <input
                type="datetime-local"
                name="deadline"
                value={form.deadline}
                onChange={handleChange}
                className="
    w-full
    rounded-xl
    border
    border-gray-300
    bg-white
    p-3
    text-gray-900
    focus:border-blue-500
    focus:ring-2
    focus:ring-blue-200
    focus:outline-none
"
            />

<Button
    type="submit"
    disabled={saving}
    className="w-full"
>
    {saving ? "⏳ Đang lưu..." : "💾 Lưu công việc"}
</Button>

        </form>

    );

}