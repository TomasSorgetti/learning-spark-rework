export default function PostInput({
  id,
  type = "text",
  placeholder = "",
  name,
  value = "",
  onChange,
  onBlur,
  disabled = false,
  error,
  ...props
}) {
  return (
    <div className="flex flex-col relative w-full mb-6 max-w-[500px]">
      <div className="relative">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          aria-invalid={error ? "true" : "false"}
          className={`text-[38px] font-bold text-center border-t-0 border-x-0 border-b-2 border-gray-300 px-3 py-2 w-full pr-10 focus:outline-none focus:ring-2`}
          {...props}
        />
      </div>
      {error && (
        <small className="text-red-500 absolute left-0 bottom-[-20px]">
          {error}
        </small>
      )}
    </div>
  );
}
