import { auth, getAuth } from '../firebase'

import { isMobile } from "react-device-detect"

import { history } from 'App.js'


export function	login(provider) {
  const signer = authProvider => {
  	if (isMobile) {
  		return auth.signInWithRedirect(authProvider)
  	}
  	else {
  		return auth.signInWithPopup(authProvider)
  	}
	}
	signer(getAuth(provider)) 
    .then((result) => {
      const user = result.user;
      console.log("Login succesful: ", user)
      history.push("/mispromedios")
    });
}

export function	logout() {
  auth.signOut().then(() => {
    console.log("Logout succesful")
      history.push("/login")
  });	
}