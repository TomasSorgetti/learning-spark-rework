export default function LoadingBar({ progress, isLoading }) {
  return (
    isLoading && (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${progress}%`,
          height: "3px",
          backgroundColor: "#A98CF9",
          transition: "width 0.3s ease-in-out",
          zIndex: 9999,
        }}
      />
    )
  );
}
