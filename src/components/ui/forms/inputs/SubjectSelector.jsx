export default function SubjectSelector({
  id,
  label,
  subjectsLoading,
  subjectsError,
  subjects,
  form,
  isLoading,
  error,
  disabled = false,
  name,
  value = "",
  onChange,
  onBlur,
  ...props
}) {
  return (
    <div className="flex flex-col w-full mb-6 max-w-[300px]">
      <label htmlFor={id} className="text-sm font-semibold text-secondary">
        {label}
      </label>
      {subjectsLoading ? (
        <p>Loading subjects...</p>
      ) : subjectsError ? (
        <div>
          <p className="text-red-500">Error: {subjectsError}</p>
          <button
            type="button"
            onClick={() => {
              useSubjectStore.getState().setError(null);
              useSubjectStore.getState().setLoading(false);
            }}
            className="mt-2 text-blue-500 underline"
          >
            Retry
          </button>
        </div>
      ) : !Array.isArray(subjects) || subjects.length === 0 ? (
        <p className="text-gray-500">No subjects available</p>
      ) : (
        <>
          <select
            id={id}
            name="subject"
            value={form.subject}
            onChange={onChange}
            onBlur={onBlur}
            disabled={isLoading}
            {...props}
            className={`border border-gray-300 rounded-md p-2 ${
              error ? "border-red-500" : ""
            }`}
          >
            <option value="">Select a subject</option>
            {subjects.map((subject) => {
              return (
                <option key={subject._id} value={subject._id}>
                  {subject.name}
                </option>
              );
            })}
          </select>
          {error && <span className="text-sm text-red-500 mt-1">{error}</span>}
        </>
      )}
    </div>
  );
}
