const storeCartItems = (cartItems) => {
	const cart = cartItems.length > 0 ? cartItems : [];
	localStorage.setItem('cart', JSON.stringify(cart));
};

export const sumItems = (cartItems) => {
	storeCartItems(cartItems);
	return {
		itemCount : cartItems.reduce((total, prod) => total + prod.quantity, 0),
		total     : cartItems.reduce((total, prod) => total + prod.price * prod.quantity, 0)
	};
};

const cartReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_ITEM':
			// check if item is in cart
			if (!state.cartItems.find((item) => item.id === action.payload.id)) {
				state.cartItems.push({
					...action.payload,
					quantity : 1
				});
			}
			return {
				...state,
				cartItems : [
					...state.cartItems
				],
				...sumItems(state.cartItems)
			};

		case 'SET_QUANTITY':
			const productIndex = state.cartItems.findIndex((item) => item.id === action.payload.product.id);
			state.cartItems[productIndex].quantity = action.payload.quantity;

			return {
				...state,
				cartItems : [
					...state.cartItems
				],
				...sumItems(state.cartItems)
			};

		case 'REMOVE_ITEM':
			const newCartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
			return {
				...state,
				cartItems : [
					...newCartItems
				],
				...sumItems(newCartItems)
			};

		case 'SET_INITIAL_CART':
			return {
				...state,
				cartItems : [
					...action.payload
				],
				...sumItems(action.payload)
			};

		default:
			return state;
	}
};

export default cartReducer;
