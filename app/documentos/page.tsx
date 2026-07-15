import DocumentCard from "@/components/DocumentCard";
import { documentosEjemplo } from "@/lib/data";

export default function DocumentosPage() {
  return (
    <section className="mx-auto max-w-content px-6 py-14">
      <p className="text-[13px] font-medium uppercase tracking-wide text-institucional-claro">
        Recursos institucionales
      </p>
      <h1 className="font-display text-[32px] text-textos-principal mt-2">
        Documentos
      </h1>
      <p className="text-[15px] text-textos-secundario mt-3 max-w-[600px] leading-relaxed">
        Lineamientos, protocolos y guías de la Asesoría Regional de Educación
        Especial. Cada documento se descarga desde Google Drive.
      </p>

      <div className="grid gap-5 sm:grid-cols-3 mt-10">
        {documentosEjemplo.map((doc) => (
          <DocumentCard key={doc.id} documento={doc} />
        ))}
      </div>
    </section>
  );
}
