import { BuyProduct, Cart } from "../../utils/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import swal from 'sweetalert';
// const cartItemsFromStorage = localStorage.getItem("cartItems");

interface CartState {
	cartItems: Cart;
	// totalPrice: number | null;
}

const initialState: CartState = {
	cartItems: {
		id: 0,
		userID: 0,
		productID: [],
	},
	// totalPrice: 0,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		startCart: (state, action: PayloadAction<Cart>) => {
			state.cartItems = action.payload;
		},
		addToCart: (state, action: PayloadAction<BuyProduct>) => {
			const { id, quantity } = action.payload;
			const existingProduct = state.cartItems.productID.find(
				(product) => product.id === id
			);

			if (existingProduct) {
				existingProduct.quantity += quantity;
			} else {
				state.cartItems.productID.push(action.payload);
			}

			swal("Producto agregado al carrito");
		},

		decrementQuantity: (state, action: PayloadAction<number>) => {
			state.cartItems.productID = state.cartItems.productID.map((product) => {
				if (product.id === action.payload && product.quantity > 1) {
					return {
						...product,
						quantity: product.quantity - 1,
					};
				}
				return product;
			});
		},
		incrementQuantity: (state, action: PayloadAction<number>) => {
			state.cartItems.productID = state.cartItems.productID.map((product) => {
				if (product.id === action.payload) {
					return {
						...product,
						quantity: product.quantity + 1,
					};
				}
				return product;
			});
		},

		removeFromCart: (state, action: PayloadAction<number>) => {
			const productIdToRemove = action.payload;

			state.cartItems.productID = state.cartItems.productID.filter(
				(item) => item.id !== productIdToRemove
			);

			// state.totalPrice = calculateTotalPrice(state.cartItems.products).toString()
		},
		clearCart: (state) => {
			state.cartItems.productID = [];
			// state.totalPrice = 0;
		},
	},
});

export const {
	addToCart,
	clearCart,
	removeFromCart,
	startCart,
	incrementQuantity,
	decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
