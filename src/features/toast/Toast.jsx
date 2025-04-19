const typeStyles = {
  success: "#4dc469",
  error: "#dc3545",
  info: "#17a2b8",
  warning: "#ffc107",
};

const Toast = ({ message = "", type = "success", onClose }) => {
  return (
    <div
      className="text-white p-2 px-6 rounded-md flex gap-3 items-center transition-opacity duration-300"
      style={{ backgroundColor: typeStyles[type] || typeStyles.success }}
    >
      <p>{message}</p>
      <button onClick={onClose} aria-label="Close toast" className="font-bold">
        X
      </button>
    </div>
  );
};

export default Toast;
