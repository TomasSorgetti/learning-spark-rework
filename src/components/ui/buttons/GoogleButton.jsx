import GoogleIcon from "../../../assets/icons/google_icon.png";
import Image from "next/image";

export default function GoogleButton() {
  const handleClick = () => {
    const originUrl = window.location.href;
    const state = encodeURIComponent(originUrl);
    window.location.href = `http://localhost:8080/v1/auth/google?state=${state}`;
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex items-center justify-start gap-16 w-full max-w-[500px] min-h-[54px] px-4 border border-gray-100 rounded-md hover:bg-gray-50 my-4 bg-white shadow-sm hover:shadow-md"
    >
      <Image src={GoogleIcon} alt="google" width={36} height={36} />
      Continue with Google
    </button>
  );
}
