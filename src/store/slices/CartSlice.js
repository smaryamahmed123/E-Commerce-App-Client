import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL4 } from '../../Constants';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

// Thunks for async operations
export const addCart = createAsyncThunk('cart/add', async ({ product, quantity }) => {
  try {
    const userString = localStorage.getItem('user');
    let userId = null;
    if (userString) {
      const userObject = JSON.parse(userString);
      console.log(userObject)
      console.log(userObject._id)
      userId = userObject._id || userObject.id ;
    }

    if (!userId) {
      throw new Error('User ID is missing');
    }

    console.log('Sending data to server:', {
      userId,
      product,
      quantity,
    });

    // Make the POST request with the data
    const response = await axios.post(`${BASE_URL4}/add`, {
      userId,
      product,
      quantity,
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
});




// Fetch cart items
export const fetchCart = createAsyncThunk('cart/fetch', async () => {
  const userString = localStorage.getItem('user');
  let userId = null;
  if (userString) {
    const userObject = JSON.parse(userString);
    userId = userObject._id || userObject.id ;
  }

  if (!userId) {
    throw new Error('User ID is missing');
  }

  const response = await axios.get(`${BASE_URL4}/fetch/${userId}`);
  return response.data;
});


export const updateQuantity = createAsyncThunk('cart/updateQuantity', async ({ productId, quantity }) => {
  try {
    const userString = localStorage.getItem('user');
    let userId = null;
    if (userString) {
      const userObject = JSON.parse(userString);
      userId = userObject._id || userObject.id ;
    }

    if (!userId) {
      throw new Error('User ID is missing');
    }
    await axios.patch(`${BASE_URL4}/updateQuantity`, {
      userId, // Replace with dynamic user ID if needed
      productId,
      quantity,
    });
    return { productId, quantity };
  } catch (error) {
    throw new Error(error.response.data.message || 'Error updating quantity');
  }
});



export const removeAddToCart = createAsyncThunk('api/cart/remove', async (productId) => {
  try {
    console.log(`Attempting to remove product with ID: ${productId}`);
    const response = await axios.delete(`${BASE_URL4}/remove/${productId}`);
    console.log('Response from server:', response.data);
    return productId; // Return the productId to remove from the state
  } catch (error) {
    console.error('Error removing product from cart:', error);
    throw new Error(error.response?.data?.message || 'Error removing product from cart');
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Remove local removeAddToCart reducer function, as it is handled in extraReducers
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCart.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        const { productId, quantity } = action.payload;
        const item = state.items.find(item => item.product.id === productId);
        if (item) {
          item.quantity = quantity;
        }
      })
      .addCase(updateQuantity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(removeAddToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeAddToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        const productId = action.payload;
        state.items = state.items.filter(item => item.product.id !== productId);
      })
      .addCase(removeAddToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default cartSlice.reducer;
