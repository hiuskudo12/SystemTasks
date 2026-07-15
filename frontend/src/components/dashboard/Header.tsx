"use client";

import { useAuth } from "@/contexts/AuthContext";

export default function Header() {

    const { user, logout } = useAuth();

    return (

        <header className="flex items-center justify-between rounded-2xl bg-white p-6 shadow">

            <div>

                <h1 className="text-2xl font-bold text-blue-600">

                    📋 Personal Task Reminder

                </h1>

                <p className="text-sm text-gray-500">

                    Quản lý công việc cá nhân

                </p>

            </div>

            <div className="flex items-center gap-4">

                <span className="font-medium text-l text-gray-900">

                    Xin chào, {user?.username} 👋

                </span>

                <button
                    onClick={logout}
                    className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                >
                    Đăng xuất
                </button>

            </div>

        </header>

    );

}