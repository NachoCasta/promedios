import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";

import { auth, db } from "components/firebase.js";

export function useUser() {
	const { user } = useAuthState(auth);
	const data = {};
	let userID = "null";
	if (user) {
		userID = user.uid;
	}
	const { error, value } = useDocument(db.collection("users").doc(userID));
	if (error) {
		console.log("Error al obtener userDoc", error);
	}
	if (value) {
		data.user = value.data();
	}
	return data;
}
