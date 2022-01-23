import firebase from '../lib/firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const uiConfig = {
	signInFlow       : 'popup',
	signInSuccessUrl : '/user',
	signInOptions    : [
		firebase.auth.GoogleAuthProvider.PROVIDER_ID
	]
};

function SignIn() {
	return (
		<div>
			<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
		</div>
	);
}

export default SignIn;
