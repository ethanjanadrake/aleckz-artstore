import Head from 'next/head';
import firebase from '../firebase/clientApp';
import Gallery from '../components/Gallery';
import 'firebase/firestore';

export default function Home(props) {
	const getPaths = async () => {
		const docRef = firebase.firestore().collection('art').doc('UsCl5kYbiAExMpmSBBWm');

		const doc = await docRef.get();
		return doc;
	};

	getPaths();

	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>
				<Gallery items={props.items} />
			</main>
		</div>
	);
}

export const getStaticProps = async () => {
	const items = [];
	const ref = await firebase.firestore().collection('art');

	await ref.get().then((snap) => {
		snap.forEach((doc) => {
			items.push({ id: doc.id, data: doc.data() });
		});
	});

	return {
		props : {
			items
		}
	};
};
