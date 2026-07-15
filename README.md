# SAREESC

Sitio institucional de la Asesoría Regional de Educación Especial,
Dirección Regional de Educación San Carlos (MEP).

## Qué incluye esta primera versión

- Vista de **Inicio** con presentación de la Asesoría y accesos rápidos.
- Vista de **Documentos** con tarjetas de descarga (enlaces a Google Drive).
- Encabezado con logotipo institucional y navegación.
- Pie de página con datos de contacto oficiales.
- Paleta y tipografía institucional aplicada en Tailwind (`tailwind.config.ts`).

Los datos de documentos están en `lib/data.ts` como ejemplo — en la
siguiente fase se conectan a Firestore para que puedas gestionarlos desde
el panel de administrador, sin tocar código.

## Cómo correrlo en tu computadora

```bash
npm install
npm run dev
```

Abre http://localhost:3000

## Pendiente para las próximas sesiones

1. Vista de **Videos** (mismo patrón que Documentos, con embed de YouTube).
2. Vista de **Eventos** (afiches/banners).
3. Panel de **administrador** protegido con Firebase Auth.
4. Conectar Firestore como fuente real de documentos, videos y eventos.
5. Subir el logotipo en alta resolución a `public/logo.png` (por ahora se
   copió el archivo que compartiste).
