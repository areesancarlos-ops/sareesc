export default function Footer() {
  return (
    <footer className="bg-institucional text-white mt-20">
      <div className="mx-auto max-w-content px-6 py-10 grid gap-8 sm:grid-cols-2">
        <div>
          <p className="font-display text-[17px]">
            Asesoría Regional de Educación Especial
          </p>
          <p className="text-[14px] text-white/70 mt-1">
            Dirección Regional de Educación San Carlos
          </p>
          <p className="text-[14px] text-white/70">
            Ministerio de Educación Pública · Gobierno de Costa Rica
          </p>
        </div>

        <div className="text-[14px] text-white/80 space-y-1.5 sm:text-right">
          <p>Ciudad Quesada, San Carlos, costado este de la UNED</p>
          <p>2460-0594, ext. 1834 · 2459-1100, ext. 33621</p>
          <p>
            <a
              href="mailto:dresc.asesoria.educacionespecial@mep.go.cr"
              className="underline hover:text-dorado transition-colors"
            >
              dresc.asesoria.educacionespecial@mep.go.cr
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-content px-6 py-4 text-[12px] text-white/50">
          © {new Date().getFullYear()} Asesoría Regional de Educación Especial, DRE San Carlos.
        </p>
      </div>
    </footer>
  );
}
