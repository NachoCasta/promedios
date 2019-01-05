import { useState, useEffect } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";

import deepEqual from "deep-equal";

import { auth, db } from "components/firebase.js";

export function useUser() {
	let initialState = readState();
	if (initialState === null) {
		initialState = { notas: {} };
	}
	const [state, setState] = useState(initialState);
	const { user, initializing } = useAuthState(auth);
	let userID = "null";
	if (user) {
		userID = user.uid;
	}
	const { error, value } = useDocument(db.collection("users").doc(userID));
	if (error) {
		console.log("Error al obtener userDoc", error);
	}
	if (value) {
		if (!deepEqual(state, value.data()) && value.data()) {
			setState(value.data());
		}
	}
	useEffect(() => {
		// add event listener to save state to localStorage
		// when user leaves/refreshes the page
		window.addEventListener("beforeunload", writeState(state));
		return () => {
			window.removeEventListener("beforeunload", writeState(state));
		};
	});
	let logged = initializing | (user !== null);
	return { user: state, logged };
}

function writeState(state) {
	localStorage.setItem("user", stateToJson(state));
}

function readState() {
	return JSON.parse(localStorage.getItem("user"));
}

function stateToJson(state) {
	for (const [ano, semestres] of Object.entries(state.notas)) {
		for (const [semestre, ramos] of Object.entries(semestres)) {
			for (const ramo of ramos) {
				ramo.toJSON = () => ({ storage: true, id: ramo.id });
			}
		}
	}
	return JSON.stringify(state);
}
