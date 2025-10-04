import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


type fetchCart = {
  userId?: string;
  guestId?: string;
};

type addToCart = {
     productId: string;
  name: string;
  price: number;
  image: string;
  size?: string;
  color?: string;
  quantity: number;
  userId?: string;
  guestId?: string;
};

type updateCart = {
     productId: string;
  size?: string;
  color?: string;
  quantity: number;
  userId?: string;
  guestId?: string;
}

type removeFromCart = {
     productId: string;
  name: string;
  price: number;
  image: string;
  size?: string;
  color?: string;
  quantity: number;
  userId?: string;
  guestId?: string;
}

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  image: string;
  size?: string;
  color?: string;
  quantity: number;
};

export type Cart = {
  products: CartItem[];
  totalPrice?: number;
};

// Base URL: proxy in dev, env var in prod
const baseURL =
  import.meta.env.MODE === "development"
    ? "" // proxy will handle `/api`
    : import.meta.env.VITE_BACKEND_URL;

// Helper function to load cart from localStorage
const loadCartFromStorage = (): Cart => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : {products : []};
};

// Helper function that helps saves cart to localStorage
const saveCartToStorage = (cart: Cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// fetch cart for user or guest
export const fetchCart = createAsyncThunk<Cart, fetchCart>("cart/fetchCart", async ({ userId, guestId}, {rejectWithValue}) => {
    try {
        const response = await axios.get(
            `${baseURL}/api/cart`,
            {
                params: { userId, guestId }
            }
        );
        return response.data
    } catch (error) {
        console.error(error);
        return rejectWithValue(error.response?.data)
    }
});

// Add an item to cart for guest
export const addToCart = createAsyncThunk<Cart, addToCart>("cart/addToCart", async ({productId, quantity, size, color, guestId, userId},
    {rejectWithValue}) => {
        try {
            const response = await axios.post(`${baseURL}/api/cart`, {
                productId, quantity, size, color, guestId, userId,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    });


    // update the quantity of an item in the cart 
    export const updateCartItemQuantity = createAsyncThunk<Cart, updateCart>(
        "cart/updateCartItemQuantity", async ({productId, quantity, size, color, userId, guestId},
            {rejectWithValue}) => {
                try {
                    const response = await axios.put(`${baseURL}/api/cart`, {
                        productId,
                        quantity,
                        size,
                        color,
                        userId,
                        guestId,
                    });
                    return response.data;
                } catch (error) {
                    return rejectWithValue(error.response.data)
                }
            }
    );

    // remove item from cart
    export const removeFromCart = createAsyncThunk<Cart, removeFromCart>("cart/removeFromCart", async ({productId, guestId, userId, size, color},
        {rejectWithValue}) => {
            try {
                const response = await axios({
                    method: "DELETE",
                    url: `${baseURL}/api/cart`,
                    data: {productId, guestId, userId, size, color}
                });
                return response.data;
            } catch (error) {
               return rejectWithValue(error.response.data)
            }
        });


        // Merge guest cart into user cart upon login
        export const mergeCarts = createAsyncThunk<Cart, {user: string; guestId: string}>(
            "cart/mergeCarts", async ({user, guestId}, {rejectWithValue}) => {
                try {
                    const response = await axios.post(`${baseURL}/api/cart/merge`, {
                        user,
                        guestId
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("userToken")}`
                        },
                    }
                );
                    return response.data;
                } catch (error) {
                    return rejectWithValue(error.response.data);
                }
            }
        );

        const cartSlice = createSlice({
            name: "cart",
            initialState: {
                cart: loadCartFromStorage(),
                loading: false,
                error: null
            },
            reducers: {
                clearCart: (state) => {
                    state.cart = {products: []};
                    localStorage.removeItem("cart");
                },
            },
            extraReducers: (builder) => {
                builder
                .addCase(fetchCart.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(fetchCart.fulfilled, (state, action) => {
                    state.loading = false;
                    state.cart = action.payload;
                    saveCartToStorage(action.payload);
                })
                .addCase(fetchCart.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                })
                .addCase(addToCart.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(addToCart.fulfilled, (state, action) => {
                    state.loading = false;
                    state.cart = action.payload;
                    saveCartToStorage(action.payload);
                })
                .addCase(addToCart.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                })
                .addCase(updateCartItemQuantity.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
                    state.loading = false;
                    state.cart = action.payload;
                    saveCartToStorage(action.payload);
                })
                .addCase(updateCartItemQuantity.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                })
                .addCase(removeFromCart.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(removeFromCart.fulfilled, (state, action) => {
                    state.loading = false;
                    state.cart = action.payload;
                    saveCartToStorage(action.payload);
                })
                .addCase(removeFromCart.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                })
                .addCase(mergeCarts.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(mergeCarts.fulfilled, (state, action) => {
                    state.loading = false;
                    state.cart = action.payload;
                    saveCartToStorage(action.payload);
                })
                .addCase(mergeCarts.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                });
            }
        });

        export const {clearCart} = cartSlice.actions;
        export default cartSlice.reducer;