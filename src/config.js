const firebase = require("firebase");
const firebaseConfig = {
  apiKey: "AIzaSyC113mRYpOpD0Qeu9XqY_fiVmZapXPw_jY",
  authDomain: "survergrej.firebaseapp.com",
  projectId: "survergrej",
  storageBucket: "survergrej.appspot.com",
  messagingSenderId: "627193425728",
  appId: "1:627193425728:web:144dbd11809aced34714a5",
  measurementId: "G-T0DJGN46E5"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const User = db.collection("test");
module.exports = User;