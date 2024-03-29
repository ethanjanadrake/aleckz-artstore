import Link from "next/link";
import { useContext, useState, useRef } from "react";
import { CartContext } from "../context/cart-context";
import { AiFillDelete } from "react-icons/ai";

export default function StoreItem(props) {
	const { item } = props;
	const { setQuantity, removeProduct } = useContext(CartContext);
	const [edit, setEdit] = useState(false);
	const quantityInput = useRef();

	return (
		<div className='mb-10 grid grid-cols-4 relative'>
			<Link href={`/${props.item.id}`}>
				<a className='w-12'>
					<img src={item.url} alt={item.name} className='w-12 h-auto' />
				</a>
			</Link>
			<h2 className='flex items-center capitalize'>{item.name}</h2>
			<div className='flex justify-end items-center'>
				{!edit && item.quantity > 1 && (
					<button
						onClick={() => {
							setQuantity(item, item.quantity - 1);
						}}
						className='bg-tertiary-200 p-2 rounded-md font-bold hover:bg-tertiary-100'
					>
						Less
					</button>
				)}
				{edit ? (
					<input
						type='text'
						autoFocus
						defaultValue={item.quantity}
						onBlur={() => {
							if (
								quantityInput.current.value &&
								quantityInput.current.value > 0
							) {
								setQuantity(item, parseInt(quantityInput.current.value));
							} else {
								const confirmation = confirm("Remove this cart item?");
								if (confirmation) {
									removeProduct(item);
								}
							}

							if (
								quantityInput.current.value &&
								quantityInput.current.value > item.stock
							) {
								setQuantity(item, parseInt(item.stock));
							}
							if (
								quantityInput.current.value &&
								quantityInput.current.value < 1
							) {
								setQuantity(item, 1);
							}
							setEdit(false);
						}}
						ref={quantityInput}
						className='px-3 w-12'
					/>
				) : (
					<button
						onClick={() => {
							if (!item.stock || item.stock > 1) {
								setEdit(true);
							}
						}}
						className='px-3 w-12 cursor-text'
					>
						{item.quantity}
					</button>
				)}
				{!edit && (!item.stock || item.quantity < item.stock) && (
					<button
						onClick={() => {
							setQuantity(item, item.quantity + 1);
						}}
						className='bg-tertiary-200 p-2 rounded-md font-bold hover:bg-tertiary-100'
					>
						+
					</button>
				)}
			</div>
			<h2 className='flex items-center justify-end font-bold'>
				${parseFloat(item.price * item.quantity).toFixed(2)}
			</h2>
			{!edit && (
				<button
					onClick={() => {
						const confirmation = confirm("Remove this cart item?");
						if (confirmation) {
							removeProduct(item);
						}
					}}
					className='hover:text-red-500 transition-all absolute -right-7 top-2'
				>
					<AiFillDelete />
				</button>
			)}
		</div>
	);
}
