"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Card from "@/components/common/Card";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { register } from "@/services/auth.service";
import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
} from "react-icons/fa";

export default function RegisterPage() {

    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (token) {

            router.replace("/dashboard");

        }

    }, [router]);

    const [form, setForm] = useState({

        full_name: "",

        username: "",

        email: "",

        password: "",

        confirmPassword: "",

    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value,

        });

    };

    const handleSubmit = async (
    e: React.FormEvent
) => {

    e.preventDefault();

    if (
        !form.full_name ||
        !form.username ||
        !form.email ||
        !form.password
    ) {

        alert("Vui lòng nhập đầy đủ thông tin");

        return;

    }

    if (form.password !== form.confirmPassword) {

        alert("Mật khẩu xác nhận không khớp");

        return;

    }

    try {

        setLoading(true);

        const result = await register(
            form.full_name,
            form.username,
            form.email,
            form.password
        );

        alert("Đăng ký thành công!");

setTimeout(() => {

    router.push("/login");

}, 1000);

    } catch (error: any) {

        alert(
            error.response?.data?.message ||
            "Đăng ký thất bại"
        );

    } finally {

        setLoading(false);

    }

};


    return (

        <main className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex items-center justify-center px-4">

            <Card>

                <div className="mb-8 text-center">

                    <div className="text-5xl mb-4">
                        📝
                    </div>

                    <h1 className="text-3xl font-bold text-blue-600">

                        Đăng ký tài khoản

                    </h1>

                </div>

                <form
    className="space-y-5"
    onSubmit={handleSubmit}
>

                    <Input
                        label="Họ và tên"
                        name="full_name"
                        value={form.full_name}
                        onChange={handleChange}
                        leftIcon={<FaUser />}
                    />

                    <Input
                        label="Username"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        leftIcon={<FaUser />}
                    />

                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        leftIcon={<FaEnvelope />}
                    />

                    <Input
                        label="Password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={form.password}
                        onChange={handleChange}
                        leftIcon={<FaLock />}
                        rightIcon={
                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                            >
                                {
                                    showPassword
                                        ? <FaEyeSlash />
                                        : <FaEye />
                                }
                            </button>
                        }
                    />

                    <Input
                        label="Confirm Password"
                        name="confirmPassword"
                        type={
                            showConfirmPassword
                                ? "text"
                                : "password"
                        }
                        value={form.confirmPassword}
                        onChange={handleChange}
                        leftIcon={<FaLock />}
                        rightIcon={
                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        !showConfirmPassword
                                    )
                                }
                            >
                                {
                                    showConfirmPassword
                                        ? <FaEyeSlash />
                                        : <FaEye />
                                }
                            </button>
                        }
                    />

                    <Button
    type="submit"
    disabled={loading}
>

    {loading ? "Đang đăng ký..." : "Đăng ký"}

</Button>

                </form>

                <div className="mt-6 text-center">

                    <span
                        className="cursor-pointer text-blue-600 hover:underline"
                        onClick={() => router.push("/login")}
                    >

                        Đã có tài khoản? Đăng nhập

                    </span>

                </div>

            </Card>

        </main>

    );

}