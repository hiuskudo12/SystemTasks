"use client";

interface ModalProps {
    open: boolean;
    title: string;
    onClose: () => void;
    children: React.ReactNode;
}

export default function Modal({
    open,
    title,
    onClose,
    children,
}: ModalProps) {

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">

                <div className="mb-5 flex items-center justify-between">

                    <h2 className="text-2xl font-bold text-gray-900">
                        {title}
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-2xl text-gray-500 hover:text-red-500"
                    >
                        ×
                    </button>

                </div>

                {children}

            </div>

        </div>
    );
}