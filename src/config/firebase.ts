// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCscKla7_BNR__G_ivAS-31F91GLajuS8s",
  authDomain: "walletai-54194.firebaseapp.com",
  projectId: "walletai-54194",
  storageBucket: "walletai-54194.firebasestorage.app",
  messagingSenderId: "117974433997",
  appId: "1:117974433997:web:4bfaac2679109008962984",
  measurementId: "G-XMHLY79GLB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
// const analytics = getAnalytics(app);

export default app;
