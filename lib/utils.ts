/**
 * Convierte un enlace de "compartir" de Google Drive
 * (ej. https://drive.google.com/file/d/XXXX/view?usp=sharing)
 * en una URL que se puede usar directamente en una etiqueta <img>.
 *
 * Requiere que el archivo esté compartido como
 * "Cualquier persona con el enlace" puede ver.
 */
export function enlaceDriveAImagen(url: string): string {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
  const id = match?.[1];
  if (!id) return url;
  return `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
}
