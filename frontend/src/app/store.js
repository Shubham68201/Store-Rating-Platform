import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import adminReducer from '../features/adminSlice';
import storeReducer from '../features/storeSlice';
import ratingReducer from '../features/ratingSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        admin: adminReducer,
        stores: storeReducer,
        ratings: ratingReducer,
    },
});

export default store;
