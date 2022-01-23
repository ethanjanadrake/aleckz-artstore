import firebase from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import 'firebase/firestore';
import UserForm from '../components/UserForm';
import { useEffect, useState } from 'react';

export default function user() {
	const [
		currUser,
		authLoading,
		authError
	] = useAuthState(firebase.auth());

	const getUserDoc = async () => {
		const docRef = firebase.firestore().collection('users').doc(currUser.uid);
		const doc = await docRef.get();
		const data = doc.data();
		const user = { ...data, id: currUser.uid };
		return user;
	};

	const [
		userState,
		setUserState
	] = useState({});

	useEffect(
		async () => {
			if (!authLoading) {
				const newUserState = await getUserDoc();
				setUserState(newUserState);
			}
		},
		[
			authLoading
		]
	);

	return (
		<div>
			<UserForm originalData={userState} />
		</div>
	);
}
