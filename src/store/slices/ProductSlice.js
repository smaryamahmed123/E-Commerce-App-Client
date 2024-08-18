import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL3 } from '../../Constants';

export const fetchData = createAsyncThunk('products/fetch', async () => {
  try {
    const response = await axios.get(`${BASE_URL3}/products`);
    // console.log('API Response:', response.data);  // Debug log
    return response.data;
  } catch (error) {
    throw Error(error.response?.data?.message || 'Error fetching data');
  }
});

const initialState = {
  allProducts: [],
  isLoading: false,
  error: '',
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allProducts = action.payload;
      // console.log('Fulfilled State:', state);  // Debug log
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.isLoading = false;
      state.allProducts = [];
      state.error = action.error.message;
      // console.log('Rejected State:', state);  // Debug log
    });
  },
});

const { reducer } = productSlice;
export default reducer;
