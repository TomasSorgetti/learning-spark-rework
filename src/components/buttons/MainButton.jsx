export default function MainButton({ children, href }) {
  return (
    <a
      className="bg-primary px-8 py-2 text-white rounded-full font-semibold text-[18px] lg:text-[20px]"
      href={href}
    >
      {children}
    </a>
  );
}
