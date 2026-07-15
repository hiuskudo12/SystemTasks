import {
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
} from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      leftIcon,
      rightIcon,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-900">
          {label}
        </label>

        <div className="relative">

          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-900">
              {leftIcon}
            </div>
          )}

<input
    ref={ref}
    {...props}
    className={`
        w-full
        rounded-xl
        border
        border-gray-300
        bg-white
        py-3
        ${leftIcon ? "pl-11" : "pl-4"}
        ${rightIcon ? "pr-11" : "pr-4"}
        text-gray-900
        placeholder:text-gray-500
        outline-none
        transition
        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-200
        ${error ? "border-red-500" : ""}
        ${className}
    `}
/>

          {rightIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-900">
              {rightIcon}
            </div>
          )}

        </div>

        {error && (
          <p className="text-sm text-red-900">
            {error}
          </p>
        )}

      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;