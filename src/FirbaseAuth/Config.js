// src/FirebaseAuth/Config.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, confirmPasswordReset } from 'firebase/auth';

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyAHTaHbvJbQGrqpuLyQGQPp0-iGInJm_tI",
  authDomain: "teampassword-90f54.firebaseapp.com",
  projectId: "teampassword-90f54",
  storageBucket: "teampassword-90f54.appspot.com",
  messagingSenderId: "1062258938931",
  appId: "1:1062258938931:web:7ee5d811a29b2158f1bf46",
  measurementId: "G-TK7B9PESPM"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();

export { auth, googleAuthProvider, confirmPasswordReset };

