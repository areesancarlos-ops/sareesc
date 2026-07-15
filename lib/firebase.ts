import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Estas claves son seguras de exponer en el navegador — no son secretas.
// La protección real de los datos vive en las Reglas de Seguridad de Firestore.
const firebaseConfig = {
  apiKey: "AIzaSyCnraoLSwhuDF6rbzasecB2XsM3OYWcvxw",
  authDomain: "sareesc.firebaseapp.com",
  projectId: "sareesc",
  storageBucket: "sareesc.firebasestorage.app",
  messagingSenderId: "691206689364",
  appId: "1:691206689364:web:de67f29e570fd0814513c1",
  measurementId: "G-HEF1JXWW9W",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
