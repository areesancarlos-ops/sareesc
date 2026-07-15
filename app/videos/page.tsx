"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Video } from "@/lib/types";

function idDeYoutube(url: string) {
  const match = url.match(/(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "videos"), orderBy("fecha", "desc"));
    const unsubscribe = onSnapshot(q, (snap) => {
      setVideos(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Video)));
      setCargando(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <section className="mx-auto max-w-content px-6 py-14">
      <p className="text-[13px] font-medium uppercase tracking-wide text-institucional-claro">
        Recursos audiovisuales
      </p>
      <h1 className="font-display text-[32px] text-textos-principal mt-2">Videos</h1>
      <p className="text-[15px] text-textos-secundario mt-3 max-w-[600px] leading-relaxed">
        Capacitaciones y recursos audiovisuales sobre educación inclusiva.
      </p>

      {cargando && <p className="text-[14px] text-textos-secundario mt-10">Cargando videos…</p>}
      {!cargando && videos.length === 0 && (
        <p className="text-[14px] text-textos-secundario mt-10">Todavía no hay videos publicados.</p>
      )}

      <div className="grid gap-6 sm:grid-cols-2 mt-10">
        {videos.map((video) => {
          const ytId = idDeYoutube(video.enlaceYoutube);
          return (
            <article key={video.id} className="rounded-lg border border-borde bg-white overflow-hidden">
              {ytId ? (
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${ytId}`}
                    title={video.titulo}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              ) : (
                <a
                  href={video.enlaceYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block aspect-video bg-institucional/5 flex items-center justify-center text-[13px] text-institucional"
                >
                  Ver en YouTube ↗
                </a>
              )}
              <div className="p-4">
                <h3 className="font-display text-[16px] text-textos-principal">{video.titulo}</h3>
                {video.descripcion && (
                  <p className="text-[13px] text-textos-secundario mt-1 leading-relaxed">
                    {video.descripcion}
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
