export type Documento = {
  id: string;
  titulo: string;
  descripcion: string;
  categoria: string;
  enlaceDrive: string;
  fecha: string;
};

// Datos de ejemplo — en producción estos vendrán de Firestore,
// gestionados desde la vista de administrador.
export const documentosEjemplo: Documento[] = [
  {
    id: "1",
    titulo: "Guía de adecuaciones curriculares 2026",
    descripcion:
      "Lineamientos para el diseño de adecuaciones significativas y no significativas en el aula regular.",
    categoria: "Lineamientos",
    enlaceDrive: "https://drive.google.com/",
    fecha: "2026-02-10",
  },
  {
    id: "2",
    titulo: "Protocolo de referencia a Servicios de Apoyo",
    descripcion:
      "Pasos administrativos para la referencia de estudiantes a los distintos servicios de apoyo educativo.",
    categoria: "Protocolos",
    enlaceDrive: "https://drive.google.com/",
    fecha: "2026-01-22",
  },
  {
    id: "3",
    titulo: "Plan Regional de Educación Especial",
    descripcion:
      "Plan de acción anual de la Asesoría Regional con metas por circuito educativo.",
    categoria: "Planificación",
    enlaceDrive: "https://drive.google.com/",
    fecha: "2025-11-30",
  },
];
