import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD04TRCBDkLwRenckydsV3yagzHJZiFUeA",
  authDomain: "productivity24-9396f.firebaseapp.com",
  projectId: "productivity24-9396f",
  storageBucket: "productivity24-9396f.appspot.com",
  messagingSenderId: "537394445602",
  appId: "1:537394445602:web:800f735d3d98b38605b97b",
  measurementId: "G-G6YZ2XD8YT"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
