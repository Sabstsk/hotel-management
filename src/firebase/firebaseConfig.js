// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDP6D561YcIP5SdV6f4a2rqi-HfoDkhfbw",
  authDomain: "website-b37e4.firebaseapp.com",
  projectId: "website-b37e4",
  storageBucket: "website-b37e4.firebasestorage.app",
  messagingSenderId: "483820914239",
  appId: "1:483820914239:web:f183dc64729d2994e4da8a",
  measurementId: "G-4WF7NEY3W2"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
