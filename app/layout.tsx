import type { Metadata } from "next";
import { Source_Serif_4, Public_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const display = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600"],
});

const body = Public_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "SAREESC — Asesoría Regional de Educación Especial, San Carlos",
  description:
    "Sitio institucional de la Asesoría Regional de Educación Especial, Dirección Regional de Educación San Carlos, MEP.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${display.variable} ${body.variable} font-sans antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
