export default function CardButton({ children, href }) {
  return (
    <a
      className="w-full rounded-full bg-primary transition-all duration-500 hover:bg-alter3 hover:shadow-lg  py-2 text-center text-white font-semibold lg:py-3"
      href={href}
    >
      {children}
    </a>
  );
}
