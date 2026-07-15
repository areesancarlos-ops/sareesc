import Link from "next/link";
import BranchDivider from "@/components/BranchDivider";
import DocumentCard from "@/components/DocumentCard";
import { documentosEjemplo } from "@/lib/data";

const ENLACES = [
  {
    href: "/documentos",
    titulo: "Documentos",
    descripcion: "Lineamientos, protocolos y guías institucionales disponibles para consulta y descarga.",
  },
  {
    href: "/videos",
    titulo: "Videos",
    descripcion: "Capacitaciones y recursos audiovisuales sobre educación inclusiva.",
  },
  {
    href: "/eventos",
    titulo: "Eventos",
    descripcion: "Afiches y convocatorias de actividades de la Asesoría Regional.",
  },
];

export default function InicioPage() {
  return (
    <div>
      <section className="mx-auto max-w-content px-6 pt-16 pb-10">
        <p className="text-[13px] font-medium uppercase tracking-wide text-institucional-claro">
          Dirección Regional de Educación San Carlos · MEP
        </p>
        <h1 className="font-display text-[36px] sm:text-[44px] leading-tight text-textos-principal mt-3 max-w-[720px]">
          Asesoría Regional de Educación Especial
        </h1>
        <p className="text-[16px] text-textos-secundario mt-4 max-w-[640px] leading-relaxed">
          Acompañamos a los centros educativos de San Carlos en la construcción
          de ecosistemas de apoyo para una educación inclusiva, accesible y de
          calidad para todo el estudiantado.
        </p>
      </section>

      <BranchDivider />

      <section className="mx-auto max-w-content px-6 py-12">
        <div className="grid gap-6 sm:grid-cols-3">
          {ENLACES.map((enlace) => (
            <Link
              key={enlace.href}
              href={enlace.href}
              className="rounded-lg border border-borde bg-white p-6 hover:border-institucional-claro transition-colors"
            >
              <h2 className="font-display text-[19px] text-institucional">
                {enlace.titulo}
              </h2>
              <p className="text-[14px] text-textos-secundario mt-2 leading-relaxed">
                {enlace.descripcion}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-12">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-display text-[22px] text-textos-principal">
            Documentos recientes
          </h2>
          <Link
            href="/documentos"
            className="text-[14px] font-medium text-institucional hover:text-institucional-claro"
          >
            Ver todos →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          {documentosEjemplo.map((doc) => (
            <DocumentCard key={doc.id} documento={doc} />
          ))}
        </div>
      </section>
    </div>
  );
}
