import useStorage from '../hooks/useStorage';
import { useEffect } from 'react';
import firebase from '../firebase/clientApp';
import 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

const ProgressBar = ({ file, setFile, data, id, originalFileName }) => {
	const [
		user
	] = useAuthState(firebase.auth());
	const { url, progress } = useStorage(file, data.fileName, originalFileName);

	const addArtDocument = async () => {
		// if an id was passed in, that means this is for an edit instead of an original upload
		if (id) {
			await firebase.firestore().collection('art').doc(id).set({ user: user.uid, ...data, url });
		}
		else {
			// if there is no id passed, then this is an original upload, and therefore we need to create a new random id for the doc
			await firebase.firestore().collection('art').doc().set({ user: user.uid, ...data, url });
		}
	};

	useEffect(
		async () => {
			// every time a new file is uploaded and submitted from UploadForm, this will trigger.
			if (url) {
				setFile(null);
				await addArtDocument();
				window.location.reload();
			}
		},
		[
			url,
			setFile
		]
	);

	return <div className='h-4 bg-blue-300 mt-3 rounded-full' style={{ width: progress + '%' }} />;
};

export default ProgressBar;
