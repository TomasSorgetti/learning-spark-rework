import { Link } from "@/i18n/routing";

export default function BlogRow({
  _id,
  title,
  subject,
  url,
  author,
  createdAt,
}) {
  const formatedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  return (
    <Link
      href={`/admin/blog/update/${url}`}
      className="w-full flex justify-between bg-gray-100 p-4 rounded-md cursor-pointer hover:bg-gray-200"
    >
      <span className="font-bold w-full max-w-[300px] overflow-hidden ">
        {title}
      </span>
      <span className="w-full max-w-[200px] overflow-hidden ">{subject}</span>
      <span className="w-full max-w-[100px] overflow-hidden ">{author}</span>
      <span className="w-full max-w-[80px] overflow-hidden ">
        {formatedDate}
      </span>
    </Link>
  );
}
