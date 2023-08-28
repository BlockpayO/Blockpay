// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: Process.env.NEXT_PUBLIC_apiKey,
  authDomain: NEXT_PUBLIC_authDomain,
  projectId: NEXT_PUBLIC_projectId,
  storageBucket: NEXT_PUBLIC_storageBucket,
  messagingSenderId: NEXT_PUBLIC_messagingSenderId,
  appId: NEXT_PUBLIC_appId,
  measurementId: NEXT_PUBLIC_measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export {
    app,
    analytics
}