import { useContext } from 'react';
import { CartContext } from '../context/cart-context';
import CartItem from '../components/CartItem';
import { useAuthState } from 'react-firebase-hooks/auth';
import getStripe from '../lib/getStripe';
import firebase from '../lib/firebase';

export default function cart() {
	const createStripeCheckout = firebase.functions().httpsCallable('createStripeCheckout');

	const [
		user
	] = useAuthState(firebase.auth());

	const { cartItems } = useContext(CartContext);
	console.log(cartItems);

	return (
		<div>
			{cartItems &&
				cartItems.map((item) => (
					<div key={item.id} className=''>
						<CartItem item={item} />
					</div>
				))}
			{cartItems && (
				<button
					onClick={async () => {
						if (user) {
						}
						await createStripeCheckout({
							items : cartItems.map((item) => {
								return {
									quantity : item.quantity,
									id       : item.id
								};
							})
						}).then((response) => {
							const sessionId = response.data.id;
							getStripe().then((res) => res.redirectToCheckout({ sessionId }));
						});
					}}
					className='w-32 p-3 hover:bg-blue-500 transition-all font-bold block mx-auto bg-blue-300 rounded-lg'
				>
					Checkout
				</button>
			)}
		</div>
	);
}
