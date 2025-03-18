export default function CardButton({ children, href, target = "_blank" }) {
  return (
    <a
      className="w-full rounded-full bg-primary transition-all duration-500 hover:bg-alter3 hover:shadow-xl focus:bg-alter4 py-2 text-center text-white font-semibold lg:py-4"
      target={target}
      href={href}
    >
      {children}
    </a>
  );
}
