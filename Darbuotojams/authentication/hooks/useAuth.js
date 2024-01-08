import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../config/Firebase";

export default function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("auth object:", auth);

    const unsub = onAuthStateChanged(auth, (user) => {
      console.log("got user: ", user);
      if (user) {
        setUser(user);
        console.log("User ID:", user.uid);
      } 
      else {
        setUser(null);
        console.log("User not logged in.");
      }
    });
    return unsub;
  }, []);

  return { user };
}