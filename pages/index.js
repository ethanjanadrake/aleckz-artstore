import Head from 'next/head';
import firebase from '../firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Home() {
	const [
		user,
		loading,
		error
	] = useAuthState(firebase.auth());

	console.log('Loading:', loading, '|', 'Current User:', user);

	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>Hellooo</main>
		</div>
	);
}
