import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBBaPOFSBK8WQx8iFzZpDjpBX8XktDgzt4",
  authDomain: "valerioo-perfume.firebaseapp.com",
  projectId: "valerioo-perfume",
  storageBucket: "valerioo-perfume.firebasestorage.app",
  messagingSenderId: "714400540597",
  appId: "1:714400540597:web:2eb4834ae825ac42079bfc"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
