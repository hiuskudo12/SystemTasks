"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export default function ProtectedRoute({
    children,
}: ProtectedRouteProps) {

    const router = useRouter();

    const {
        user,
        isLoading,
    } = useAuth();

    useEffect(() => {

        if (!isLoading && !user) {

            router.replace("/login");

        }

    }, [user, isLoading, router]);

    if (isLoading) {

        return (
            <div className="min-h-screen flex items-center justify-center">
                Đang tải...
            </div>
        );

    }

    if (!user) {

        return null;

    }

    return children;

}