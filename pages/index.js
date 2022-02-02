
import firebase from '../lib/firebase';
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
			<Gallery items={props.items} />
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
