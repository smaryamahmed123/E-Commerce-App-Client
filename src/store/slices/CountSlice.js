
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  counter: 0,
};
const cartItems = JSON.parse(localStorage.getItem("AddToCart"));

// If cartItems is an array, count its length to get the number of items
const initialCounter = Array.isArray(cartItems) ? cartItems.length : 0;

// Use the initialCounter as the initial state for the counter
initialState.counter = initialCounter;
const counterSlice = createSlice({
  name: "counter",
  initialState: initialState,
  reducers: {
    addCounter: (state, payload) => {
    //   console.log("add counter call", state.counter);
    state.counter++;
      // state.counter = ++state.counter;
    },
    minusCounter: (state, payload) => {
      // console.log("minus counter call", state.counter);
      state.counter = state.counter > 0 ? --state.counter : 0;
    },
  },
});

const { actions, reducer } = counterSlice;

export const { addCounter, minusCounter } = actions;

export default reducer;