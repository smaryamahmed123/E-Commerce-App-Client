
import React from "react";
import { addCounter, minusCounter } from "../store/slices/CountSlice";
import { useDispatch } from "react-redux";
import AddToCart from "../Pages/Cart";
import { Button, Stack } from "@mui/material";

const Buttons = () => {
  const dispatch = useDispatch();

  const addCount = () => {
    dispatch(addCounter());
    AddToCart()
  };
  const minusCount = () => {
    dispatch(minusCounter());
  };

  return (
    <>
      <button onClick={addCount}>AddToCart</button>
      <button onClick={minusCount}> minus Button</button>
    </>
  );
};


function ColorButtons() {
  return (
    <Stack direction="row" spacing={2}>
      <Button color="secondary">Secondary</Button>
      <Button variant="contained" color="success">
        Success
      </Button>
      <Button variant="outlined" color="error">
        Error
      </Button>
    </Stack>
  );
}


export  {Buttons, ColorButtons};