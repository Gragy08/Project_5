// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVFymGzvkKfbDnpAWP7_S0YPMztJ0EJlg",
  authDomain: "project-5-535df.firebaseapp.com",
  databaseURL: "https://project-5-535df-default-rtdb.firebaseio.com",
  projectId: "project-5-535df",
  storageBucket: "project-5-535df.firebasestorage.app",
  messagingSenderId: "947348561224",
  appId: "1:947348561224:web:2d25fafdb84dd7bff9a77d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// biến để kết nối được với database
export const dbFirebase = getDatabase(app);
// biến để dùng tính năng đăng ký/đăng nhập và đăng xuất
export const authFirebase = getAuth(app);