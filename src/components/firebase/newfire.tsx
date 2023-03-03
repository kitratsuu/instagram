// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIGukCTJOvMZNvZlakzW8Vf7qWOcAxM1I",
  authDomain: "insta-21fdb.firebaseapp.com",
  projectId: "insta-21fdb",
  storageBucket: "insta-21fdb.appspot.com",
  messagingSenderId: "990325657064",
  appId: "1:990325657064:web:2dccfe232cf7518b13e85d",
  measurementId: "G-R7MRFS7C9C",
};

// Initialize Firebase
export function initApp() {
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
}
