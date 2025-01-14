export default function HamburgerButton({ handleClick }) {
  return (
    <button
      className="z-50 flex flex-col gap-2 lg:hidden"
      onClick={handleClick}
    >
      <span className="h-1 w-9 bg-darkBlue"></span>
      <span className="h-1 w-9 bg-darkBlue"></span>
      <span className="h-1 w-9 bg-darkBlue"></span>
    </button>
  );
}
