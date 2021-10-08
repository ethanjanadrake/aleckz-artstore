import { useContext } from 'react';
import firebase from '../../firebase/clientApp';
import 'firebase/firestore';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AiOutlineEdit, AiFillDelete } from 'react-icons/ai';
import { GiCancel } from 'react-icons/gi';
import UploadForm from '../../components/UploadForm';
import { CartContext } from '../../context/cart-context';
import { isInCart } from '../../helpers';

export default function index(props) {
	const item = { ...props.doc, id: props.id };
	console.log(item);

	const { addProduct, cartItems } = useContext(CartContext);
	console.log(cartItems);

	const [
		user
	] = useAuthState(firebase.auth());

	const [
		editing,
		setEditing
	] = useState(false);

	return (
		<div>
			<img src={item.url} alt={item.name} className='h-64' />
			<h2>{item.name}</h2>
			<h2>{item.description}</h2>
			<h2>{item.artist}</h2>
			<h2>${item.price}</h2>

			<button
				onClick={() => {
					addProduct(item);
				}}
				className='transition-all bg-blue-300 hover:bg-blue-100 rounded-xl p-4'
			>
				{!isInCart(item, cartItems) ? <span>Add to Cart</span> : <span>Add More to Cart</span>}
			</button>

			{/* admin editing */}
			{user &&
			user.uid === 's458jrHiHTZY6wiJUfc8jJ0FR1J3' && (
				<div>
					{!editing && (
						<div>
							<button
								className='transition-all hover:text-blue-700'
								onClick={() => {
									setEditing(true);
								}}
							>
								<AiOutlineEdit />
							</button>
							<button
								className='transition-all hover:text-red-700'
								onClick={async () => {
									const confirmation = confirm('Delete this Item forever?');
									if (confirmation) {
										const storageRef = firebase.storage().ref();
										await firebase.firestore().collection('art').doc(props.id).delete();
										await storageRef.child('art/' + item.fileName).delete();
										window.location.reload();
									}
								}}
							>
								<AiFillDelete />
							</button>
						</div>
					)}
					{editing && (
						<div>
							<UploadForm originalData={item} id={props.id} />
							<button
								className='transition-all text-black hover:text-red-700'
								onClick={() => {
									setEditing(false);
								}}
							>
								<GiCancel />
							</button>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export const getStaticProps = async (context) => {
	const docRef = firebase.firestore().collection('art').doc(context.params.id);

	const doc = await docRef.get();

	if (doc.exists) {
		return {
			props : {
				doc : doc.data(),
				id  : context.params.id
			}
		};
	}
	else {
		return {
			notFound : true
		};
	}
};

export async function getStaticPaths() {
	let ids = [];

	const collection = await firebase.firestore().collection('art');

	await collection.get().then((snap) => {
		snap.forEach((doc) => {
			ids.push(doc.id);
		});
	});

	const paths = ids.map((id) => ({ params: { id } }));

	return {
		paths,
		fallback : false
	};
}
