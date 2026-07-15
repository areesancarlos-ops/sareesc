"use client";

import { useAuth } from "@/lib/useAuth";
import LoginForm from "@/components/LoginForm";
import AdminDashboard from "@/components/AdminDashboard";

export default function AdminPage() {
  const { user, cargando } = useAuth();

  if (cargando) {
    return <p className="text-center text-[14px] text-textos-secundario py-24">Cargando…</p>;
  }

  if (!user) {
    return <LoginForm />;
  }

  return <AdminDashboard correo={user.email ?? ""} />;
}
