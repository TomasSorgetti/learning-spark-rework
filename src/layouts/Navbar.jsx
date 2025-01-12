import MainButton from "@/components/buttons/MainButton";

export default function Navbar() {
  return (
    <header className="bg-white shadow-lg">
      <nav className="w-full max-w-[1440px] mx-auto flex justify-between items-center px-4 py-8">
        <a href="#">Learning Spark</a>
        <ul className="hidden md:flex md:gap-4 md:items-center ">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Blog</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <MainButton href="#">Book now</MainButton>
          </li>
        </ul>
      </nav>
    </header>
  );
}
