"use client";

import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useForm } from "react-hook-form";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaClipboardCheck } from "react-icons/fa";
import { useState, useEffect } from "react";
import { login } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
interface LoginForm {
    username: string;
    password: string;
}
export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
useEffect(() => {

        const token = localStorage.getItem("token");

        if (token) {

            router.replace("/dashboard");

        }

    }, [router]);
const { refreshProfile } = useAuth();
    const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
} = useForm<LoginForm>();

const onSubmit = async (data: LoginForm) => {

    try {

        const result = await login(
            data.username,
            data.password
        );

        localStorage.setItem(
            "token",
            result.data.token
        );

        await refreshProfile();
        alert("Đăng nhập thành công!");
        router.replace("/dashboard");

    } catch (error: any) {

        alert(
            error.response?.data?.message ||
            "Đăng nhập thất bại"
        );

    }

};

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-white-50 to-indigo-100 flex items-center justify-center px-4">

      <Card>

        <div className="mb-8 text-center">

          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 shadow-lg">
    <FaClipboardCheck
        size={36}
        className="text-white"
    />
</div>

          <h1 className="text-3xl font-extrabold tracking-wide text-gray-800">
    Personal Task Reminder
</h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Theo dõi và nhắc công việc cá nhân
          </p>

        </div>

        <form
    className="space-y-5"
    onSubmit={handleSubmit(onSubmit)}
>

          <Input
    label="Username"
    placeholder="Nhập username"
    leftIcon={<FaUser />}
    {...register("username", {
        required: "Vui lòng nhập username"
    })}
    error={errors.username?.message}
/>

<Input
    label="Password"
    type={showPassword ? "text" : "password"}
    placeholder="Nhập mật khẩu"
    leftIcon={<FaLock />}
    {...register("password", {
        required: "Vui lòng nhập mật khẩu"
    })}
    error={errors.password?.message}
    rightIcon={
        <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-500 hover:text-blue-600"
        >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
    }
/>
<div className="flex items-center justify-between">

    <label className="flex items-center gap-2 text-sm text-gray-600">

        <input
            type="checkbox"
            className="rounded"
        />

        Ghi nhớ đăng nhập

    </label>

</div>

          <Button
    type="submit"
    loading={isSubmitting}
>
    Đăng nhập
</Button>

        </form>

        <div className="mt-6 text-center">

          <p className="text-gray-500">

            Chưa có tài khoản?

<span
    className="ml-2 cursor-pointer font-semibold text-blue-600 hover:underline"
    onClick={() => router.push("/register")}
>
    Đăng ký
</span>

          </p>

        </div>

      </Card>

    </main>
  );
}