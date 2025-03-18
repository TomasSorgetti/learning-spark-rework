import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // Usa Lucide Icons

export default function FormFieldInput({
  id,
  label,
  type = "text",
  placeholder = "",
  name,
  value = "",
  onChange,
  onBlur,
  disabled = false,
  error,
  isPassword = false,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col relative w-full mb-6 max-w-[500px]">
      <label htmlFor={id} className="text-sm font-semibold text-secondary">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={isPassword && !showPassword ? "password" : "text"}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          aria-invalid={error ? "true" : "false"}
          className={`px-3 py-2 border rounded-md w-full pr-10 focus:outline-none focus:ring-2 ${
            error
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-blue-300"
          }`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      {error && (
        <small className="text-red-500 absolute left-0 bottom-[-20px]">
          {error}
        </small>
      )}
    </div>
  );
}
