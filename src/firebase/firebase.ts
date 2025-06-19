import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBVykMZ3vOFj6-TMwegT5k7go5Kms_yrgU",
  authDomain: "propriologics.firebaseapp.com",
  projectId: "propriologics",
  storageBucket: "propriologics.firebasestorage.app",
  messagingSenderId: "995411982736",
  appId: "1:995411982736:web:48d2078766fcbffc7c1b15",
  measurementId: "G-LVCDQ8C3R8"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };