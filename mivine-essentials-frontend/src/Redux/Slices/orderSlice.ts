import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Order } from "../../types/Order";

const baseURL =
  import.meta.env.MODE === "development"
    ? "" // proxy will handle `/api`
    : import.meta.env.VITE_BACKEND_URL;

// Fetch all orders for the logged-in user
export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/api/orders/my-orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Server Error");
    }
  }
);

// Fetch single order details
export const fetchOrderDetails = createAsyncThunk(
  "orders/fetchOrderDetails",
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Server Error");
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [] as Order[],
    totalOrders: 0,
    orderDetails: null as Order,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch user orders
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        // handle both `{orders}` or raw array response
        state.orders = action.payload.orders || action.payload;
        state.totalOrders = action.payload.totalOrders || state.orders.length;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;

        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else if (
          typeof action.payload === "object" &&
          action.payload !== null &&
          "message" in action.payload
        ) {
          state.error = (action.payload as { message: string }).message;
        } else {
          state.error = "Unknown error";
        }
      })
      // Fetch single order
      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default orderSlice.reducer;
