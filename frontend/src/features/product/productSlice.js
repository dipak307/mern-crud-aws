import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    productStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    productSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    productFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetProduct: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
});

export const {
  productStart,
  productSuccess,
  productFail,
  resetProduct,
} = productSlice.actions;

export default productSlice.reducer;
