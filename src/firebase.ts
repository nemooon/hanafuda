// Firebase App (the core Firebase SDK) is always required and must be listed first
import { initializeApp } from 'firebase/app';

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyDL_IrDJoHJJke665fFB4RNI_HhaLX3lzY",
  authDomain: "sapa-koikoi.firebaseapp.com",
  projectId: "sapa-koikoi",
  storageBucket: "sapa-koikoi.appspot.com",
  messagingSenderId: "903720043579",
  appId: "1:903720043579:web:12b963752db468353ac81e",
  measurementId: "G-03LMJNRFZ0"
});

// Add the Firebase products that you want to use
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Initialize Firebase
export const analytics = getAnalytics(firebaseApp);
export const auth = getAuth(firebaseApp);
// export const firestore = getFirestore(firebaseApp);