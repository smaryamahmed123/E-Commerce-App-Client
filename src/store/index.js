import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./slices/ProductSlice"
// import AuthReducer from "./slices/AuthSlice"
import counterReducer from "./slices/CountSlice"
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import addToCartReducer from "./slices/CartSlice"
import userReducer from './slices/userSlice';
import authReducer from './slices/AuthSlice';

const persistConfig = {
  key: "cart",
  storage,
};

const persistedReducer = persistReducer(persistConfig, addToCartReducer);


const store = configureStore({
    reducer: {
        product: ProductReducer,
        auth: authReducer,
        counter:  counterReducer,
        cart: persistedReducer,
        user: userReducer,
    },
  });
  
  export const persistor = persistStore(store);
  export default store;
