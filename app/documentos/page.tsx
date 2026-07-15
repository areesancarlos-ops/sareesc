"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import DocumentCard from "@/components/DocumentCard";
import type { Documento } from "@/lib/types";

export default function DocumentosPage() {
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "documentos"), orderBy("fecha", "desc"));
    const unsubscribe = onSnapshot(q, (snap) => {
      setDocumentos(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Documento)));
      setCargando(false);
    });
    return () => unsubscribe();
  }, []);

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

      {cargando && (
        <p className="text-[14px] text-textos-secundario mt-10">Cargando documentos…</p>
      )}
      {!cargando && documentos.length === 0 && (
        <p className="text-[14px] text-textos-secundario mt-10">
          Todavía no hay documentos publicados.
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-3 mt-10">
        {documentos.map((doc) => (
          <DocumentCard key={doc.id} documento={doc} />
        ))}
      </div>
    </section>
  );
}
