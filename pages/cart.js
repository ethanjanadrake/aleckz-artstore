import { useContext } from 'react';
import { CartContext } from '../../context/cart-context';

export default function cart() {
	const { cartItems } = useContext(CartContext);
	console.log(cartItems);
	return <div>Cart Page</div>;
}
