import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBb8hyc3c_7DzE9wr2o70Yk0c84OssCCEQ",
  authDomain: "crud-b3289.firebaseapp.com",
  projectId: "crud-b3289",
  storageBucket: "crud-b3289.appspot.com",
  messagingSenderId: "455996289361",
  appId: "1:455996289361:web:8d4dee9ba7415d24556370",
  measurementId: "G-PE1RH00D1W",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
