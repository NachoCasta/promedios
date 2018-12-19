import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
	apiKey: "AIzaSyCWX7TMzBkRDNmT0WUcOiDXZ87UrtWmpqQ",
	authDomain: "promediosuc.firebaseapp.com",
	databaseURL: "https://promediosuc.firebaseio.com",
	projectId: "promediosuc",
	storageBucket: "promediosuc.appspot.com",
	messagingSenderId: "641413576356"
};
firebase.initializeApp(config);

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();

export function getAuth(provider) {
	switch (provider) {
		case "google":
			return googleAuthProvider;
		case "facebook":
			return facebookAuthProvider;
		case "github":
			return githubAuthProvider;
		default:
			throw new Error("Sorry. We don't have that provider");
	}
}

export const auth = firebase.auth();
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);
export const db = firestore;

export function isAdmin() {
	if (auth.currentUser) {
		return auth.currentUser.email === "icastanedaw@gmail.com";
	}
	return false;
}

export default firebase;
