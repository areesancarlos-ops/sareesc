"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { enlaceDriveAImagen } from "@/lib/utils";
import type { Evento } from "@/lib/types";

export default function EventosPage() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "eventos"),
      where("activo", "==", true),
      orderBy("fecha", "desc")
    );
    const unsubscribe = onSnapshot(q, (snap) => {
      setEventos(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Evento)));
      setCargando(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <section className="mx-auto max-w-content px-6 py-14">
      <p className="text-[13px] font-medium uppercase tracking-wide text-institucional-claro">
        Actividades regionales
      </p>
      <h1 className="font-display text-[32px] text-textos-principal mt-2">Eventos</h1>
      <p className="text-[15px] text-textos-secundario mt-3 max-w-[600px] leading-relaxed">
        Afiches y convocatorias de actividades de la Asesoría Regional.
      </p>

      {cargando && <p className="text-[14px] text-textos-secundario mt-10">Cargando eventos…</p>}
      {!cargando && eventos.length === 0 && (
        <p className="text-[14px] text-textos-secundario mt-10">Todavía no hay eventos publicados.</p>
      )}

      <div className="grid gap-6 sm:grid-cols-3 mt-10">
        {eventos.map((evento) => {
          const contenido = (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={enlaceDriveAImagen(evento.enlaceImagen)} alt={evento.titulo} className="w-full aspect-[3/4] object-cover" />
              <div className="p-4">
                <h3 className="font-display text-[16px] text-textos-principal">{evento.titulo}</h3>
                {evento.descripcion && (
                  <p className="text-[13px] text-textos-secundario mt-1 leading-relaxed">
                    {evento.descripcion}
                  </p>
                )}
              </div>
            </>
          );
          return evento.enlace ? (
            <a
              key={evento.id}
              href={evento.enlace}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-borde bg-white overflow-hidden hover:border-institucional-claro transition-colors"
            >
              {contenido}
            </a>
          ) : (
            <article key={evento.id} className="rounded-lg border border-borde bg-white overflow-hidden">
              {contenido}
            </article>
          );
        })}
      </div>
    </section>
  );
}
