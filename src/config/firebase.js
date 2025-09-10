import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "quizzme1.firebaseapp.com",
  projectId: "quizzme1",
  storageBucket: "quizzme1.firebasestorage.app",
  messagingSenderId: "917250227968",
  appId:"1:917250227968:web:c89e9232fc243777557de5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export Firestore instance and common methods
export { db};