import { useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import {
  getAuth,
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendSignInLinkToEmail
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import { actionCodeSettings } from "./Components/ActionCodeSettings";

const firebaseConfig = {

  apiKey: "AIzaSyC113mRYpOpD0Qeu9XqY_fiVmZapXPw_jY",
  authDomain: "survergrej.firebaseapp.com",
  projectId: "survergrej",
  storageBucket: "survergrej.appspot.com",
  messagingSenderId: "627193425728",
  appId: "1:627193425728:web:144dbd11809aced34714a5",
  measurementId: "G-T0DJGN46E5"

};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const provider = new GoogleAuthProvider()

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result)
    }).catch((error) => {
      console.log(error)
    })
}


// firebase emulator
//connectAuthEmulator(auth, "http://localhost:9099");

export const db = getFirestore(app)

export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
}

export function logIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
}

export function logOut() {
  return signOut(auth)
}

// Custom Hook

export function useAuth() {
  const [currentUser, setCurrentUser] = useState()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user))
    return unsub
  }, [])

  return currentUser
}






