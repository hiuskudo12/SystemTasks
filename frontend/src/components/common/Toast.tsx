interface ToastProps {
    message: string;
    type?: "success" | "error";
}

export default function Toast({
    message,
    type = "success",
}: ToastProps) {

    return (

        <div
            className={`
                fixed
                top-6
                right-6
                z-50
                rounded-xl
                px-6
                py-4
                text-white
                shadow-lg
                animate-pulse
                ${type === "success"
                    ? "bg-green-500"
                    : "bg-red-500"}
            `}
        >

            {message}

        </div>

    );

}