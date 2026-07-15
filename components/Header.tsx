import Image from "next/image";
import Link from "next/link";

const NAV = [
  { href: "/", label: "Inicio" },
  { href: "/documentos", label: "Documentos" },
  { href: "/videos", label: "Videos" },
  { href: "/eventos", label: "Eventos" },
];

export default function Header() {
  return (
    <header className="border-b border-borde bg-white/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="mx-auto max-w-content px-6 py-3 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3 min-w-0">
          <Image
            src="/logo.png"
            alt="Asesoría Regional de Educación Especial, D.R.E. San Carlos"
            width={44}
            height={44}
            className="shrink-0"
          />
          <div className="min-w-0">
            <p className="font-display text-[15px] leading-tight text-institucional truncate">
              Asesoría Regional de Educación Especial
            </p>
            <p className="text-[12px] text-textos-secundario leading-tight">
              Dirección Regional de Educación San Carlos · MEP
            </p>
          </div>
        </Link>

        <nav aria-label="Navegación principal">
          <ul className="flex items-center gap-6 text-[14px] font-medium text-textos-principal">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover:text-institucional-claro transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
