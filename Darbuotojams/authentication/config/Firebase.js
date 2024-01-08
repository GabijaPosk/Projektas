import { setDoc, doc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged } from "firebase/auth";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBcLO2Ve-V9SgTutchauZCw4wRcCg4TvOo",
  authDomain: "baigiamasisprojektas-f9129.firebaseapp.com",
  projectId: "baigiamasisprojektas-f9129",
  storageBucket: "baigiamasisprojektas-f9129.appspot.com",
  messagingSenderId: "447673278484",
  appId: "1:447673278484:web:d5b7dad9ae638968bbc701"
};

if (!firebase.apps.leght){
  firebase.initializeApp(firebaseConfig)
}

export{firebase};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (email, password, firstName, lastName, phoneNumber, position) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await updateProfile(user, {
      displayName: `${firstName} ${lastName}`,
    });
    await setDoc(doc(db, 'users', user.uid), {
      firstName: firstName,
      lastName: lastName,
      email:email,
      phoneNumber: phoneNumber,
      password:password,
      position:position,
    });
    return user;
  } 
  catch (error) {
    console.error("Error creating user:", error.message);
    throw error;
  }
};
onAuthStateChanged(auth, (user) => {
  console.log("Auth state changed. Current user:", user);
});
export default auth;

const signOut = async () => {
  try {
    await auth.signOut();
  } 
  catch (error) {
    console.error("Error signing out:", error.message);
    throw error;
  }
};

export { signUp, signOut };