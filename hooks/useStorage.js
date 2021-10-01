import { useState, useEffect } from 'react';
import firebase from '../firebase/clientApp';
// import uuid from 'react-uuid';
// import path from 'path';

const useStorage = (file, fileName, originalFileName) => {
	const [
		progress,
		setProgress
	] = useState(0);
	const [
		error,
		setError
	] = useState(null);
	const [
		url,
		setUrl
	] = useState(null);

	useEffect(
		async () => {
			const storageRef = firebase.storage().ref('/art/' + fileName);

			storageRef.put(file).on(
				'state_changed',
				(snap) => {
					let percentage = snap.bytesTransferred / snap.totalBytes * 100;
					setProgress(percentage);
				},
				(err) => {
					setError(err);
				},
				async () => {
					const url = await storageRef.getDownloadURL();
					setUrl(url);
				}
			);
			if (originalFileName) {
				await firebase.storage().ref('/art/' + originalFileName).delete();
			}
		},
		[
			file
		]
	);
	return { progress, url, error, fileName };
};

export default useStorage;
