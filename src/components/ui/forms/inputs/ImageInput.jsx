export default function ImageInput({
  id,
  label,
  name,
  disabled = false,
  onChange,
  onBlur,
  error,
  fileName = "",
  ...props
}) {
  return (
    <div className="flex flex-col relative w-full mb-6 max-w-[500px]">
      <label htmlFor={id} className="text-sm font-semibold text-secondary">
        {label}
      </label>
      <input
        type="file"
        id={id}
        accept="image/*"
        name={name}
        className="border border-gray-300 rounded-md p-2"
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        {...props}
      />
      {fileName && (
        <span className="text-sm text-gray-500 mt-1">{fileName}</span>
      )}
      {error && <span className="text-sm text-red-500 mt-1">{error}</span>}
    </div>
  );
}
