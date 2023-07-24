import { useContext, useEffect, useReducer, createContext } from 'react';
import reducer from './reducer';
import cartItems from './data';
import {
	INCREASE,
	DECREASE,
	DISPLAY_ITEMS,
	REMOVE,
	LOADING,
	CLEAR_CART,
} from './action';
import { getTotals } from './utilis';
// console.log(cartItems);
// const newMap = new Map(cartItems.map((item) => [item.id, item]));
// console.log(newMap);
const AppContext = createContext();

const initialState = {
	loading: false,
	cart: new Map(cartItems.map((item) => [item.id, item])),
};

export const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const { totalCost, totalAmount } = getTotals(state.cart);

	const clearCart = () => {
		dispatch({ type: CLEAR_CART });
	};
	const remove = (id) => {
		dispatch({ type: REMOVE, payload: { id } });
	};
	const increase = (id) => {
		dispatch({ type: INCREASE, payload: { id } });
	};
	const decrease = (id) => {
		dispatch({ type: DECREASE, payload: { id } });
	};

	return (
		<AppContext.Provider
			value={{
				...state,
				clearCart,
				remove,
				increase,
				decrease,
				totalAmount,
				totalCost,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useGlobalContext = () => {
	return useContext(AppContext);
};
