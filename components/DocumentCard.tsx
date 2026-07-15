import type { Documento } from "@/lib/types";

function formatearFecha(fecha: string) {
  return new Date(fecha).toLocaleDateString("es-CR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function DocumentCard({ documento }: { documento: Documento }) {
  return (
    <article className="rounded-lg border border-borde bg-white p-6 flex flex-col gap-3 hover:border-institucional-claro transition-colors">
      <span className="text-[12px] font-medium uppercase tracking-wide text-dorado-oscuro">
        {documento.categoria}
      </span>
      <h3 className="font-display text-[18px] text-textos-principal leading-snug">
        {documento.titulo}
      </h3>
      <p className="text-[14px] text-textos-secundario leading-relaxed">
        {documento.descripcion}
      </p>
      <div className="mt-2 flex items-center justify-between text-[13px] text-textos-secundario">
        <span>{formatearFecha(documento.fecha)}</span>
        <a
          href={documento.enlaceDrive}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-institucional hover:text-institucional-claro"
        >
          Descargar ↗
        </a>
      </div>
    </article>
  );
}
