export type Documento = {
  id: string;
  titulo: string;
  descripcion: string;
  categoria: string;
  enlaceDrive: string;
  fecha: string; // ISO string
};

export type Video = {
  id: string;
  titulo: string;
  descripcion: string;
  enlaceYoutube: string;
  fecha: string;
};

export type Evento = {
  id: string;
  titulo: string;
  descripcion: string;
  enlaceImagen: string;
  enlace?: string;
  fecha: string;
  activo: boolean;
};
