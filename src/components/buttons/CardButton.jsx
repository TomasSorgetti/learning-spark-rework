export default function CardButton({ children, href }) {
  return (
    <a
      className="w-full rounded-full bg-primary py-2 text-center text-white font-semibold lg:py-3"
      href={href}
    >
      {children}
    </a>
  );
}
