import { auth, getAuth } from "../firebase";

import { isMobile } from "react-device-detect";

import { history } from "App.js";

import { db } from "components/firebase.js";

export function login(provider) {
  const signer = authProvider => {
    if (isMobile) {
      return auth.signInWithRedirect(authProvider);
    } else {
      return auth.signInWithPopup(authProvider);
    }
  };
  signer(getAuth(provider)).then(result => {
    const user = result.user;
    const userData = {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL
    };
    if (result.additionalUserInfo.isNewUser) {
      console.log("Usuario creado");
      db.collection("users")
        .doc(user.uid)
        .set(userData);
    }
    console.log("Login succesful: ", userData.email);
    history.push("/mispromedios");
  });
}

export function logout() {
  auth.signOut().then(() => {
    console.log("Logout succesful");
    history.push("/login");
  });
}
