import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getetProducthandler } from "../service/product";
import { getProductsByMerchantId } from "../service/user";


const initialState = {
 merchantSProduct : [] ,
 loading : false,
 error : false
};

export const merchantsProductlist = createAsyncThunk(
  "merchant/merchantsProductlist", async()=>{
         const {data} = await getProductsByMerchantId()
         return data
  }
  
);



const merchantSlice = createSlice({
  name: "merchant",
  initialState,
  reducers: {
    removeProduct(state, action) {
      const productId = action.payload;
      state.merchantSProduct = state.merchantSProduct.filter(
        (x) => x._id !== productId
      );
    },

    addProduct(state, action) {
      state.merchantSProduct.push(action.payload);
    },

    updateProductsData: (state, action) => {
      const updatedProduct = action.payload;
      state.merchantSProduct = state.merchantSProduct.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      );
    },

    activeDeactiveProduct : (state, action) => {
      console.log(action,'action from merchant slice')
        const updateproduct = action.payload;
        state.merchantSProduct = state.merchantSProduct.map((product) => 
          product._id == updateproduct._id ? updateproduct : product
        )
    }

  },
  
  extraReducers: (builder) => {
    builder
      .addCase(merchantsProductlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(merchantsProductlist.fulfilled, (state, action) => {
        state.loading = false;
        state.merchantSProduct = action.payload;
      })
      .addCase(merchantsProductlist.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })
      
  },
});

export const {
  addProduct,
  updateProductsData,
  removeProduct,
  activeDeactiveProduct,
} = merchantSlice.actions;

export default merchantSlice.reducer;

