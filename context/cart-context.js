import React, { createContext, useReducer, useEffect, useState } from 'react';
import cartReducer from './cart-reducer';

export const CartContext = createContext();
const initialState = { cartItems: [], itemCount: 0, total: 0 };

const CartContextProvider = ({ children }) => {
	const [
		state,
		dispatch
	] = useReducer(cartReducer, initialState);

	useEffect(() => {
		const storage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
		setInitialCart(storage);
	}, []);

	const setInitialCart = (storage) => dispatch({ type: 'SET_INITIAL_CART', payload: storage });

	const addProduct = (product) => dispatch({ type: 'ADD_ITEM', payload: product });

	const setQuantity = (product, quantity) => dispatch({ type: 'SET_QUANTITY', payload: { product, quantity } });

	const removeProduct = (product) => dispatch({ type: 'REMOVE_ITEM', payload: product });

	const contextValues = {
		...state,
		addProduct,
		setQuantity,
		removeProduct
	};

	return <CartContext.Provider value={contextValues}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
