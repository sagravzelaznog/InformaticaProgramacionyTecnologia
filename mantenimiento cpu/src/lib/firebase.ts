import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC08vUkWdQ9Ad3PaXS0uZ0yu_EWWBaq-aQ",
  authDomain: "acceso-a-cursos-4a314.firebaseapp.com",
  projectId: "acceso-a-cursos-4a314",
  storageBucket: "acceso-a-cursos-4a314.firebasestorage.app",
  messagingSenderId: "851856735092",
  appId: "1:851856735092:web:04290714cb63e4244c4a21"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
