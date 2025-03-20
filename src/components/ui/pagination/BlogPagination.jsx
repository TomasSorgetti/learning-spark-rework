import { Link } from "@/i18n/routing";

export default function BlogPagination({ currentPage, totalPages }) {
  if (totalPages <= 1) {
    return null;
  }

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const minButtons = 7;

  const realPages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const fillerPages =
    totalPages < minButtons
      ? Array.from(
          { length: minButtons - totalPages },
          (_, i) => totalPages + i + 1
        )
      : [];
  const allPages = [...realPages, ...fillerPages];

  return (
    <div className="flex items-center justify-center my-20 gap-4 w-full max-w-[600px] mx-auto">
      <Link
        href={`/blog?page=${prevPage}`}
        passHref
        className={`bg-secondary text-white h-[40px] px-6 rounded-md text-center flex items-center ${
          currentPage === 1 ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        Prev
      </Link>

      <div className="flex items-center gap-2">
        {allPages.map((page) => (
          <Link
            href={`/blog?page=${page}`}
            key={page}
            passHref
            className={`w-[40px] h-[40px] border border-secondary text-secondary hover:bg-secondary hover:text-white rounded-md text-center flex items-center justify-center ${
              currentPage === page
                ? "bg-secondary text-white pointer-events-none"
                : page > totalPages
                ? "opacity-[40%] pointer-events-none"
                : ""
            }`}
          >
            {page}
          </Link>
        ))}
      </div>

      <Link
        href={`/blog?page=${nextPage}`}
        passHref
        className={`bg-secondary text-white h-[40px] px-6 rounded-md text-center flex items-center ${
          currentPage === totalPages ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        Next
      </Link>
    </div>
  );
}
