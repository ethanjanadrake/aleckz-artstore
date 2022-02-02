import { useContext } from "react";
import { CartContext } from "../context/cart-context";
import CartItem from "../components/CartItem";
import { useAuthState } from "react-firebase-hooks/auth";
import getStripe from "../lib/getStripe";
import firebase from "../lib/firebase";

export default function cart() {
	const createStripeCheckout = firebase
		.functions()
		.httpsCallable("createStripeCheckout");

	const [user] = useAuthState(firebase.auth());

	const { cartItems } = useContext(CartContext);
	console.log(cartItems);

	return (
		<div className='mt-32 max-w-2xl mx-auto bg-primary-100 p-10 shadow-md sm:rounded-lg font-normal'>
			{cartItems &&
				cartItems.map(item => (
					<div key={item.id} className=''>
						<CartItem item={item} />
					</div>
				))}

			{cartItems && (
				<>
					<p className='text-right font-bold mb-10 '>{`Subtotal: $${cartItems
						.reduce((acc, curr) => {
							return acc + curr.price * curr.quantity;
						}, 0)
						.toFixed(2)}`}</p>
					<button
						onClick={async () => {
							if (user) {
							}
							await createStripeCheckout({
								items: cartItems.map(item => {
									return {
										quantity: item.quantity,
										id: item.id,
									};
								}),
							}).then(response => {
								const sessionId = response.data.id;
								getStripe().then(res => res.redirectToCheckout({ sessionId }));
							});
						}}
						className='w-32 p-3 hover:bg-tertiary-200 transition-all font-bold block mx-auto bg-tertiary-400 rounded-lg text-white'
					>
						Checkout
					</button>
				</>
			)}
		</div>
	);
}
