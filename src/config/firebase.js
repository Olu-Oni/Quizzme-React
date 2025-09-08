import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY || "your-api-key",
  authDomain: import.meta.env.VITE_AUTH_DOMAIN || "your-project.firebaseapp.com",
  projectId: import.meta.env.VITE_PROJECT_ID || "your-project-id",
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET || "your-project.appspot.com",
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_APP_ID || "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export Firestore instance and common methods
export { db, collection, addDoc, getDocs, doc, updateDoc, deleteDoc };