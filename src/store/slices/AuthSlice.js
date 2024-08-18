// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('authToken');
const initialState = {
    user: null,
    token: token || null,
    isAuthenticated: !!token,
    loading: false,
    error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('authToken', action.payload.token); // Save token
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signupStart(state) {
      state.loading = true;
      state.error = null;
    },
    signupSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    signupFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('authToken'); // Remove token
      localStorage.removeItem('user')
    },
  },
});

export const { loginStart, loginSuccess, loginFail,signupStart, signupSuccess, signupFail, logout } = authSlice.actions;

export default authSlice.reducer;
