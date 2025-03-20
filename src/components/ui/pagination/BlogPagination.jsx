import { Link } from "@/i18n/routing";

export default function BlogPagination({ currentPage, totalPages }) {
  if (totalPages <= 1) {
    return null;
  }

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  // Definir cuántos botones mostrar
  const mobileButtons = 3;
  const desktopButtons = 7;

  // Generar páginas reales
  const realPages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Calcular páginas para mobile (3 botones, centrados en currentPage)
  const mobileHalf = Math.floor(mobileButtons / 2); // 1 página a cada lado
  let mobileStart = Math.max(1, currentPage - mobileHalf);
  let mobileEnd = Math.min(totalPages, mobileStart + mobileButtons - 1);
  if (mobileEnd - mobileStart + 1 < mobileButtons) {
    mobileStart = Math.max(1, mobileEnd - mobileButtons + 1);
  }
  const mobileRealPages = realPages.slice(
    Math.max(0, mobileStart - 1),
    mobileEnd
  );
  const mobileFiller =
    mobileRealPages.length < mobileButtons
      ? Array.from(
          { length: mobileButtons - mobileRealPages.length },
          (_, i) => mobileEnd + i + 1
        )
      : [];
  const mobilePages = [...mobileRealPages, ...mobileFiller];

  // Calcular páginas para desktop (7 botones, centrados en currentPage)
  const desktopHalf = Math.floor(desktopButtons / 2); // 3 páginas a cada lado
  let desktopStart = Math.max(1, currentPage - desktopHalf);
  let desktopEnd = Math.min(totalPages, desktopStart + desktopButtons - 1);
  if (desktopEnd - desktopStart + 1 < desktopButtons) {
    desktopStart = Math.max(1, desktopEnd - desktopButtons + 1);
  }
  const desktopRealPages = realPages.slice(
    Math.max(0, desktopStart - 1),
    desktopEnd
  );
  const desktopFiller =
    desktopRealPages.length < desktopButtons
      ? Array.from(
          { length: desktopButtons - desktopRealPages.length },
          (_, i) => desktopEnd + i + 1
        )
      : [];
  const desktopPages = [...desktopRealPages, ...desktopFiller];

  return (
    <div className="flex items-center justify-center my-20 gap-4 w-full max-w-[600px] mx-auto">
      {/* Botón Prev */}
      <Link
        href={`/blog?page=${prevPage}`}
        passHref
        className={`bg-secondary text-white h-[40px] px-6 rounded-md text-center flex items-center ${
          currentPage === 1 ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        Prev
      </Link>

      {/* Paginación */}
      <div className="flex items-center gap-2">
        {/* Mobile: Mostrar 3 páginas */}
        <div className="flex md:hidden gap-2">
          {mobilePages.map((page) => (
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

        {/* Desktop: Mostrar 7 páginas */}
        <div className="hidden md:flex gap-2">
          {desktopPages.map((page) => (
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
      </div>

      {/* Botón Next */}
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
