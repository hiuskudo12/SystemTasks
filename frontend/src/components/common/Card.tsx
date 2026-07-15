interface CardProps {
  children: React.ReactNode;
}

export default function Card({
  children,
}: CardProps) {
  return (
    <div
      className="
      w-full
      max-w-md
      rounded-3xl
      bg-white
      border
      border-gray-100
      p-8
      shadow-2xl
hover:shadow-2xl
transition-all
duration-300
    "
    >
      {children}
    </div>
  );
}

<p className="mt-8 text-center text-xs text-gray-700">
    © 2026 Personal Task Reminder Version 1.0 • 2026
</p>