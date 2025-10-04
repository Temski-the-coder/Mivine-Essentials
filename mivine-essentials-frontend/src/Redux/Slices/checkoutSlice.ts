import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { CartItem } from "../Slices/cartSlice";

export interface CheckoutRequest {
  checkoutItems: CartItem[];
  shippingAddress: {
    email: string;
    firstName: string;
    lastName: string;
    city: string;
    country: string;
    address: string;
    postalCode: string;
    phoneNumber: string;
  };
  paymentMethod: string;
  totalPrice: number;
}

// What backend sends back
export interface CheckoutResponse {
  _id: string;
  user: string;
  checkoutItems: CartItem[];
  shippingAddress: CheckoutRequest["shippingAddress"];
  paymentMethod: string;
  totalPrice: number;
  isPaid: boolean;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
}

// Base URL: proxy in dev, env var in prod
const baseURL =
  import.meta.env.MODE === "development"
    ? "" // proxy will handle `/api`
    : import.meta.env.VITE_BACKEND_URL;

// Async thunks to create checkout session
export const createCheckout = createAsyncThunk<
  CheckoutResponse,
  CheckoutRequest
>("checkout/createCheckout", async (checkoutData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${baseURL}/api/checkout`, checkoutData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
    return response.data as CheckoutResponse;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: error.message });
  }
});

export const fetchCheckoutById = createAsyncThunk<CheckoutResponse, string>(
  "checkout/fetchCheckoutById",
  async (checkoutId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${baseURL}/api/checkout/${checkoutId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data as CheckoutResponse;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    checkout: null as CheckoutResponse | null,
    loading: false,
    error: null as null | string,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.checkout = action.payload;
      })
      .addCase(createCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCheckoutById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCheckoutById.fulfilled, (state, action) => {
        state.loading = false;
        state.checkout = action.payload;
      })
      .addCase(fetchCheckoutById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default checkoutSlice.reducer;
