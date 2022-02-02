import { useContext } from "react";
import firebase from "../../lib/firebase";
import "firebase/firestore";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";
import UploadForm from "../../components/UploadForm";
import { CartContext } from "../../context/cart-context";
import { isInCart } from "../../helpers";

export default function index(props) {
	const item = { ...props.doc, id: props.id };
	console.log(item);

	const { addProduct, cartItems } = useContext(CartContext);
	console.log(cartItems);

	const [user] = useAuthState(firebase.auth());

	const [editing, setEditing] = useState(false);

	return (
		<>
			<div className='md:px-10 w-full grid md:grid-cols-2 xl:grid-cols-3 gap-10 mt-16'>
				<img src={item.url} alt={item.name} className='xl:col-span-2' />
				<div className='flex flex-col justify-between pt-10 fon-normal bg-white bg-opacity-70 p-10'>
					<div>
						<h2 className='capitalize font-title text-5xl font-bold text-secondary-300 text-center'>
							{item.name}
						</h2>
						<h2 className='text-xl font-bold text-tertiary-300 text-center mb-10'>
							{item.artist}
						</h2>
						<h2 className='text-secondary-500'>{item.description}</h2>
					</div>
					<div className='mt-10 bottom-10 right-10 text-right'>
						<h2>In Stock: {item.stock || "Unlimited"}</h2>
						<h2>${item.price}</h2>
						{!isInCart(item, cartItems) ? (
							<button
								onClick={() => {
									addProduct(item);
								}}
								className='transition-all bg-primary-200 hover:bg-primary-100 rounded-xl p-4'
							>
								Add to Cart
							</button>
						) : (
							<button className='transition-all bg-gray-200 rounded-xl p-4 cursor-not-allowed'>
								Edit Quantity in Cart
							</button>
						)}
					</div>
				</div>
			</div>
			{/* admin editing */}
			{user &&
				(user.uid === "s458jrHiHTZY6wiJUfc8jJ0FR1J3" ||
					user.uid === "Q0XV5ZKvI3VmX3z8hrDPPuGDmYQ2") && (
					<div>
						{!editing && (
							<div className='absolute right-20 bottom-0'>
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
										const confirmation = confirm("Delete this Item forever?");
										if (confirmation) {
											const storageRef = firebase.storage().ref();
											await firebase
												.firestore()
												.collection("art")
												.doc(props.id)
												.delete();
											await storageRef.child("art/" + item.fileName).delete();
											window.location.reload();
										}
									}}
								>
									<AiFillDelete />
								</button>
							</div>
						)}
						{editing && (
							<div className='relative'>
								<UploadForm originalData={item} id={props.id} />
								<button
									className='transition-all text-black hover:text-red-700 absolute top-5 right-24'
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
		</>
	);
}

export const getStaticProps = async context => {
	const docRef = firebase.firestore().collection("art").doc(context.params.id);

	const doc = await docRef.get();

	if (doc.exists) {
		return {
			props: {
				doc: doc.data(),
				id: context.params.id,
			},
		};
	} else {
		return {
			notFound: true,
		};
	}
};

export async function getStaticPaths() {
	let ids = [];

	const collection = await firebase.firestore().collection("art");

	await collection.get().then(snap => {
		snap.forEach(doc => {
			ids.push(doc.id);
		});
	});

	const paths = ids.map(id => ({ params: { id } }));

	return {
		paths,
		fallback: false,
	};
}
