"use client";

import { useEffect, useState } from "react";
import { collection, addDoc, deleteDoc, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { enlaceDriveAImagen } from "@/lib/utils";
import type { Documento, Video, Evento } from "@/lib/types";

type Pestana = "documentos" | "videos" | "eventos";

export default function AdminDashboard({ correo }: { correo: string }) {
  const [pestana, setPestana] = useState<Pestana>("documentos");

  return (
    <div className="mx-auto max-w-content px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[13px] text-textos-secundario">
            Sesión iniciada como {correo}
          </p>
          <h1 className="font-display text-[26px] text-textos-principal">
            Panel de administrador
          </h1>
        </div>
        <button
          onClick={() => signOut(auth)}
          className="text-[13px] font-medium text-institucional hover:text-institucional-claro"
        >
          Cerrar sesión
        </button>
      </div>

      <div className="flex gap-2 border-b border-borde mb-8">
        {(["documentos", "videos", "eventos"] as Pestana[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setPestana(tab)}
            className={`px-4 py-2 text-[14px] font-medium capitalize border-b-2 -mb-px transition-colors ${
              pestana === tab
                ? "border-institucional text-institucional"
                : "border-transparent text-textos-secundario hover:text-textos-principal"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {pestana === "documentos" && <PanelDocumentos />}
      {pestana === "videos" && <PanelVideos />}
      {pestana === "eventos" && <PanelEventos />}
    </div>
  );
}

/* ---------- Documentos ---------- */

function PanelDocumentos() {
  const [items, setItems] = useState<Documento[]>([]);
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    categoria: "",
    enlaceDrive: "",
  });
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "documentos"), orderBy("fecha", "desc"));
    return onSnapshot(q, (snap) =>
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Documento)))
    );
  }, []);

  async function agregar(e: React.FormEvent) {
    e.preventDefault();
    if (!form.titulo || !form.enlaceDrive) return;
    setGuardando(true);
    await addDoc(collection(db, "documentos"), {
      ...form,
      fecha: new Date().toISOString(),
    });
    setForm({ titulo: "", descripcion: "", categoria: "", enlaceDrive: "" });
    setGuardando(false);
  }

  async function eliminar(id: string) {
    if (!confirm("¿Eliminar este documento?")) return;
    await deleteDoc(doc(db, "documentos", id));
  }

  return (
    <div className="grid gap-8 sm:grid-cols-[320px_1fr]">
      <form onSubmit={agregar} className="flex flex-col gap-3">
        <h2 className="font-display text-[17px] text-textos-principal">
          Agregar documento
        </h2>
        <Campo label="Título" value={form.titulo} onChange={(v) => setForm({ ...form, titulo: v })} required />
        <Campo label="Categoría" value={form.categoria} onChange={(v) => setForm({ ...form, categoria: v })} placeholder="Lineamientos, Protocolos…" />
        <CampoTextarea label="Descripción" value={form.descripcion} onChange={(v) => setForm({ ...form, descripcion: v })} />
        <Campo label="Enlace de Google Drive" value={form.enlaceDrive} onChange={(v) => setForm({ ...form, enlaceDrive: v })} required placeholder="https://drive.google.com/…" />
        <BotonGuardar guardando={guardando} />
      </form>

      <div className="flex flex-col gap-3">
        {items.length === 0 && <p className="text-[14px] text-textos-secundario">Todavía no hay documentos.</p>}
        {items.map((doc) => (
          <FilaItem
            key={doc.id}
            titulo={doc.titulo}
            subtitulo={doc.categoria}
            descripcion={doc.descripcion}
            onEliminar={() => eliminar(doc.id)}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------- Videos ---------- */

function PanelVideos() {
  const [items, setItems] = useState<Video[]>([]);
  const [form, setForm] = useState({ titulo: "", descripcion: "", enlaceYoutube: "" });
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "videos"), orderBy("fecha", "desc"));
    return onSnapshot(q, (snap) =>
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Video)))
    );
  }, []);

  async function agregar(e: React.FormEvent) {
    e.preventDefault();
    if (!form.titulo || !form.enlaceYoutube) return;
    setGuardando(true);
    await addDoc(collection(db, "videos"), { ...form, fecha: new Date().toISOString() });
    setForm({ titulo: "", descripcion: "", enlaceYoutube: "" });
    setGuardando(false);
  }

  async function eliminar(id: string) {
    if (!confirm("¿Eliminar este video?")) return;
    await deleteDoc(doc(db, "videos", id));
  }

  return (
    <div className="grid gap-8 sm:grid-cols-[320px_1fr]">
      <form onSubmit={agregar} className="flex flex-col gap-3">
        <h2 className="font-display text-[17px] text-textos-principal">Agregar video</h2>
        <Campo label="Título" value={form.titulo} onChange={(v) => setForm({ ...form, titulo: v })} required />
        <CampoTextarea label="Descripción" value={form.descripcion} onChange={(v) => setForm({ ...form, descripcion: v })} />
        <Campo label="Enlace de YouTube" value={form.enlaceYoutube} onChange={(v) => setForm({ ...form, enlaceYoutube: v })} required placeholder="https://youtube.com/watch?v=…" />
        <BotonGuardar guardando={guardando} />
      </form>

      <div className="flex flex-col gap-3">
        {items.length === 0 && <p className="text-[14px] text-textos-secundario">Todavía no hay videos.</p>}
        {items.map((v) => (
          <FilaItem key={v.id} titulo={v.titulo} subtitulo={v.enlaceYoutube} descripcion={v.descripcion} onEliminar={() => eliminar(v.id)} />
        ))}
      </div>
    </div>
  );
}

/* ---------- Eventos ---------- */

function PanelEventos() {
  const [items, setItems] = useState<Evento[]>([]);
  const [form, setForm] = useState({ titulo: "", descripcion: "", enlace: "", enlaceImagen: "" });
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "eventos"), orderBy("fecha", "desc"));
    return onSnapshot(q, (snap) =>
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Evento)))
    );
  }, []);

  async function agregar(e: React.FormEvent) {
    e.preventDefault();
    if (!form.titulo || !form.enlaceImagen) return;
    setGuardando(true);
    await addDoc(collection(db, "eventos"), {
      ...form,
      activo: true,
      fecha: new Date().toISOString(),
    });
    setForm({ titulo: "", descripcion: "", enlace: "", enlaceImagen: "" });
    setGuardando(false);
  }

  async function eliminar(id: string) {
    if (!confirm("¿Eliminar este evento?")) return;
    await deleteDoc(doc(db, "eventos", id));
  }

  return (
    <div className="grid gap-8 sm:grid-cols-[320px_1fr]">
      <form onSubmit={agregar} className="flex flex-col gap-3">
        <h2 className="font-display text-[17px] text-textos-principal">Agregar evento / afiche</h2>
        <Campo label="Título" value={form.titulo} onChange={(v) => setForm({ ...form, titulo: v })} required />
        <CampoTextarea label="Descripción" value={form.descripcion} onChange={(v) => setForm({ ...form, descripcion: v })} />
        <Campo label="Enlace (opcional)" value={form.enlace} onChange={(v) => setForm({ ...form, enlace: v })} />
        <Campo
          label="Enlace de la imagen (Google Drive)"
          value={form.enlaceImagen}
          onChange={(v) => setForm({ ...form, enlaceImagen: v })}
          required
          placeholder="https://drive.google.com/file/d/…"
        />
        <p className="text-[12px] text-textos-secundario -mt-2">
          Sube la imagen a Drive, compártela como &quot;Cualquier persona con el enlace&quot; y pega ese enlace aquí.
        </p>
        <BotonGuardar guardando={guardando} />
      </form>

      <div className="grid gap-4 sm:grid-cols-2">
        {items.length === 0 && <p className="text-[14px] text-textos-secundario">Todavía no hay eventos.</p>}
        {items.map((ev) => (
          <div key={ev.id} className="rounded-lg border border-borde bg-white overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={enlaceDriveAImagen(ev.enlaceImagen)} alt={ev.titulo} className="w-full h-32 object-cover" />
            <div className="p-3">
              <h3 className="font-display text-[15px] text-textos-principal">{ev.titulo}</h3>
              <button
                onClick={() => eliminar(ev.id)}
                className="mt-2 text-[12px] font-medium text-red-600 hover:text-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Campos reutilizables ---------- */

function Campo({
  label, value, onChange, required, placeholder,
}: { label: string; value: string; onChange: (v: string) => void; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label className="text-[13px] font-medium text-textos-principal">{label}</label>
      <input
        type="text"
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border border-borde px-3 py-2 text-[14px] outline-none focus:border-institucional-claro"
      />
    </div>
  );
}

function CampoTextarea({
  label, value, onChange,
}: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-[13px] font-medium text-textos-principal">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="mt-1 w-full rounded-md border border-borde px-3 py-2 text-[14px] outline-none focus:border-institucional-claro resize-none"
      />
    </div>
  );
}

function BotonGuardar({ guardando }: { guardando: boolean }) {
  return (
    <button
      type="submit"
      disabled={guardando}
      className="mt-1 rounded-md bg-institucional text-white text-[14px] font-medium py-2.5 hover:bg-institucional-claro transition-colors disabled:opacity-60"
    >
      {guardando ? "Guardando…" : "Guardar"}
    </button>
  );
}

function FilaItem({
  titulo, subtitulo, descripcion, onEliminar,
}: { titulo: string; subtitulo?: string; descripcion?: string; onEliminar: () => void }) {
  return (
    <div className="rounded-lg border border-borde bg-white p-4 flex items-start justify-between gap-4">
      <div>
        <h3 className="font-display text-[15px] text-textos-principal">{titulo}</h3>
        {subtitulo && <p className="text-[12px] text-dorado-oscuro mt-0.5">{subtitulo}</p>}
        {descripcion && <p className="text-[13px] text-textos-secundario mt-1">{descripcion}</p>}
      </div>
      <button onClick={onEliminar} className="text-[12px] font-medium text-red-600 hover:text-red-700 shrink-0">
        Eliminar
      </button>
    </div>
  );
}
