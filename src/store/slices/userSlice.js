// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null, // or any other initial value
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // your reducers here
  },
});

export const { /* actions */ } = userSlice.actions;
export default userSlice.reducer;
