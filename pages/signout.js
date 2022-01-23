import firebase from '../lib/firebase';
import { useState } from 'react';

export default function signout() {
	const [
		signout,
		setSignout
	] = useState('Logout Pending...');

	firebase.auth().signOut().then(() => {
		setSignout('You have been Logged Out');
	});
	return <div>{signout}</div>;
}
