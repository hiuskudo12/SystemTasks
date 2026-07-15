interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export default function Button({
  children,
  loading,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className="
      w-full
      rounded-xl
      bg-gradient-to-r
from-blue-600
to-indigo-600
      py-3
      font-semibold
      text-white
      transition
      hover:bg-blue-700
      hover:to-indigo-700
hover:scale-[1.02]
active:scale-95
transition-all
duration-200
      disabled:opacity-60
      disabled:cursor-not-allowed
      duration-200
    "
    >
      {loading ? "Đang xử lý..." : children}
    </button>
  );
}