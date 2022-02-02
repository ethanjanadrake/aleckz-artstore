import { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../context/cart-context";

export default function CartIcon() {
	const { itemCount } = useContext(CartContext);
	return (
		<div className='relative w-8 m-2'>
			<FaShoppingCart className='text-2xl' />

			{itemCount > 0 && (
				<span className='absolute bg-secondary-200 text-primary-100 font-bold w-4 h-4 text-xs rounded-full flex items-center justify-center inset-y-4 right-0'>
					{itemCount}
				</span>
			)}
		</div>
	);
}
