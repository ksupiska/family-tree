import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWRHNBV3HEE2Dcrt00kL_iYuAZbMOZXzE",
  authDomain: "famile-tree.firebaseapp.com",
  projectId: "famile-tree",
  storageBucket: "famile-tree.appspot.com",
  messagingSenderId: "302805866953",
  appId: "1:302805866953:web:38aa7cc8c98133a99e7018",
  measurementId: "G-PR67S4XKT2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const authInstance = getAuth(app); // Получаем auth из нашего приложения

export { authInstance as auth }; // Экспортируем authInstance как auth для использования в других частях вашего приложения
