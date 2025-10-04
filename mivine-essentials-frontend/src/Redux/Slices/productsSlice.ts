import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type FilterParams = {
  collection?: string;
  size?: string;
  color?: string;
  gender?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  search?: string;
  category?: string;
  material?: string;
  brand?: string;
  limit?: number;
};

// Base URL: proxy in dev, env var in prod
const baseURL =
  import.meta.env.MODE === "development"
    ? "" // proxy will handle `/api`
    : import.meta.env.VITE_BACKEND_URL;

  export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  countInStock: number;
  sku: string;
  category: string;
  brand: string;
  sizes: string[];
  colors: string[];
  collections: string;
  material: string;
  gender: string;
  images: {
    url: string;
    altText?: string;
  }[];
  createdAt?: string;
  updatedAt?: string;
};


type ProductsState = {
  products: Product[];
  menProducts: Product[];
  womenProducts: Product[];
  selectedProduct: Product | null;
  similarProducts: Product[];
  bestSellerProduct: Product | null;
  selectedBestSeller: Product | null;   
  loading: boolean;
  error: string | null;
  filters: {
    category: string;
    sizes: string[];
    colors: string[];
    gender: string;
    brand: string;
    minPrice: string;
    maxPrice: string;
    sortBy: string;
    search: string;
    material: string;
    collection: string;
  };
};

export const fetchBestSellerProduct = createAsyncThunk(
  "products/fetchBestSellerProduct",
  async () => {
    const query = new URLSearchParams();

    const response = await axios.get(
      `${baseURL}/api/products/best-seller?${query.toString()}`
    );
    return response.data; // should be an array
  }
);

export const fetchProductsByFilters = createAsyncThunk<Product[], FilterParams>(
  "products/fetchByFilters",
  async (filters: FilterParams) => {
    const {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
    } = filters;

    const query = new URLSearchParams();
    if (collection) query.append("collection", collection);
    if (size) query.append("size", size);
    if (color) query.append("color", color);
    if (gender) query.append("gender", gender);
    if (minPrice !== undefined) query.append("minPrice", String(minPrice));
    if (maxPrice !== undefined) query.append("maxPrice", String(maxPrice));
    if (sortBy) query.append("sortBy", sortBy);
    if (search) query.append("search", search);
    if (category) query.append("category", category);
    if (material) query.append("material", material);
    if (brand) query.append("brand", brand);
    if (limit !== undefined) query.append("limit", String(limit));

    
    const response = await axios.get(
      `${baseURL}/api/products?${query.toString()}`
    );

    return response.data;
  }
);

// async thunk to fetch a single product by ID
export const fetchProductDetails = createAsyncThunk("products/fetchProductDetails", async (id: string) => 
{
  const response = await axios.get(
    `${baseURL}/api/products/${id}`
  );
  return response.data;
}
);

// Async thunk to fetch similar products
export const updateProduct = createAsyncThunk<
  Product, //return type (the updated product)
  { id: string; productData: Partial<Product> } //argument type
>("products/updateProduct", async ({id, productData}) => 
{
  const response = await axios.put(`${baseURL}/api/products/${id}`, productData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`
      },
    }
  );
  return response.data;
});

// Async thunk to fetch similar products
export const fetchSimilarProducts = createAsyncThunk<Product[], {id: string}>("products/fetchSimilarProducts", async ({id}) => {
  const response = await axios.get(`${baseURL}/api/products/similar/${id}`
  );
  return response.data;
});

const initialState: ProductsState = {
  products: [],
  menProducts: [],
    womenProducts: [],
  selectedProduct: null,
  similarProducts: [],
  bestSellerProduct: null,
  selectedBestSeller: null,
  loading: false,
  error: null,
  filters: {
    category: "",
    sizes: [],
    colors: [],
    gender: "",
    brand: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "",
    search: "",
    material: "",
    collection: "",
  },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = {...state.filters, ...action.payload};
    },
    clearFilters: (state) => {
      state.filters = {
        category: "",
      sizes: [],
      colors: [],
      gender: "",
      brand: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "",
      search: "",
      material: "",
      collection: "",
      };
    },
    setBestSellerProduct: (state, action: PayloadAction<Product>) => {
    state.selectedBestSeller = action.payload;
  },
  },
  extraReducers: (builder) => {
    builder
    // handle fetching products with filter
    .addCase(fetchProductsByFilters.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
        const gender = action.meta.arg.gender; // use dispatched filters
  if (gender === "Men") {
    state.menProducts = action.payload;
  } else if (gender === "Women") {
    state.womenProducts = action.payload;
  }
    })
    .addCase(fetchProductsByFilters.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? null;
    })
    .addCase(fetchProductDetails.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchProductDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedProduct = action.payload as Product;
    })
    .addCase(fetchProductDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? null;
    })
    // Handling updating products
    .addCase(updateProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false;
      const updatedProduct = action.payload;
      const index = state.products.findIndex((product) => product._id === updatedProduct._id);
      if (index !== -1) {
        state.products[index] = updatedProduct
      }
    })
    .addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? null;
    })
    // handle fetch similarProducts
    .addCase(fetchSimilarProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.similarProducts = action.payload;
    })
    .addCase(fetchSimilarProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? null;
    })
    .addCase(fetchBestSellerProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBestSellerProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.bestSellerProduct = action.payload;
      })
      .addCase(fetchBestSellerProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export const { setFilters, clearFilters, setBestSellerProduct } = productsSlice.actions;
export default productsSlice.reducer;