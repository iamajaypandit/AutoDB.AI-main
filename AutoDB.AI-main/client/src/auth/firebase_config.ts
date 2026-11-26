// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIV93woSkuIU2BIOlC7tA_HRVEjHOhlfo",
  authDomain: "autodb-ai-ajay.firebaseapp.com",
  projectId: "autodb-ai-ajay",
  storageBucket: "autodb-ai-ajay.firebasestorage.app",
  messagingSenderId: "651098750875",
  appId: "1:651098750875:web:5409dd0a0e943b06d8eb3e",
  measurementId: "G-73YP1HS6DZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export { analytics }; 
export default app;