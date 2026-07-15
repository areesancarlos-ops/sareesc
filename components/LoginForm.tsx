"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function LoginForm() {
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  async function manejarEnvio(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setCargando(true);
    try {
      await signInWithEmailAndPassword(auth, correo, clave);
    } catch {
      setError("Correo o contraseña incorrectos.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="mx-auto max-w-[380px] px-6 py-24">
      <p className="text-[13px] font-medium uppercase tracking-wide text-institucional-claro">
        Panel de administrador
      </p>
      <h1 className="font-display text-[26px] text-textos-principal mt-2">
        Iniciar sesión
      </h1>
      <form onSubmit={manejarEnvio} className="mt-6 flex flex-col gap-4">
        <div>
          <label className="text-[13px] font-medium text-textos-principal">
            Correo electrónico
          </label>
          <input
            type="email"
            required
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="mt-1 w-full rounded-md border border-borde px-3 py-2 text-[14px] outline-none focus:border-institucional-claro"
          />
        </div>
        <div>
          <label className="text-[13px] font-medium text-textos-principal">
            Contraseña
          </label>
          <input
            type="password"
            required
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            className="mt-1 w-full rounded-md border border-borde px-3 py-2 text-[14px] outline-none focus:border-institucional-claro"
          />
        </div>
        {error && <p className="text-[13px] text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={cargando}
          className="mt-2 rounded-md bg-institucional text-white text-[14px] font-medium py-2.5 hover:bg-institucional-claro transition-colors disabled:opacity-60"
        >
          {cargando ? "Ingresando…" : "Ingresar"}
        </button>
      </form>
    </div>
  );
}
