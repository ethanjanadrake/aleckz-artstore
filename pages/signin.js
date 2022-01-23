import SignIn from '../components/SignIn';
import UploadForm from '../components/UploadForm';
import firebase from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function admin() {
	const [
		user,
		authLoading,
		authError
	] = useAuthState(firebase.auth());

	return (
		<div>
			<SignIn />
			{user && user.uid === 's458jrHiHTZY6wiJUfc8jJ0FR1J3' && <UploadForm />}
		</div>
	);
}
