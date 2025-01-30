export default function MainButton({ children, href, ...props }) {
  return (
    <a
      className="bg-primary cursor-pointer text-center transition-all duration-500 hover:bg-alter3 hover:shadow-lg px-8 py-3 text-white rounded-full font-semibold text-[18px] lg:text-[20px]"
      href={href}
      role="button"
      tabIndex={0}
      {...props}
    >
      {children}
    </a>
  );
}
