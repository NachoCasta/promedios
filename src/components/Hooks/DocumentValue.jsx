import { useDocument } from "react-firebase-hooks/firestore";

export function useValue(ref) {
	const { value, error } = useDocument(ref);
	let data = {};
	if (value) {
		data = value.data();
	}
	if (error) {
		console.log("error", ref, error);
	}
	return data;
}
