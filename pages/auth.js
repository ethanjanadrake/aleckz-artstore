import firebase from '../firebase/clientApp';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const uiConfig = {
	signInFlow       : 'popup',
	signInSuccessUrl : '/',
	signInOptions    : [
		firebase.auth.GoogleAuthProvider.PROVIDER_ID
	]
};

function SignInScreen() {
	return (
		<div>
			<h1>Login</h1>
			<p>Please sign in</p>
			<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
		</div>
	);
}

export default SignInScreen;
