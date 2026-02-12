import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// Get all stores (for normal users)
export const getStores = createAsyncThunk('stores/getAll', async (params, { rejectWithValue }) => {
    try {
        const { data } = await api.get('/stores', { params });
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Get store reviews
export const getStoreReviews = createAsyncThunk('stores/getReviews', async (storeId, { rejectWithValue }) => {
    try {
        const { data } = await api.get(`/ratings/public/${storeId}`);
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const storeSlice = createSlice({
    name: 'stores',
    initialState: {
        stores: [],
        currentStoreReviews: [],
        isLoading: false,
        reviewsLoading: false,
        error: null,
    },
    reducers: {
        clearStoreError: (state) => { state.error = null; },
        clearReviews: (state) => { state.currentStoreReviews = []; },
        updateStoreRating: (state, action) => {
            const { storeId, rating, review } = action.payload;
            const store = state.stores.find((s) => s._id === storeId);
            if (store) {
                store.userRating = rating;
                if (review !== undefined) store.userReview = review;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getStores.pending, (state) => { state.isLoading = true; })
            .addCase(getStores.fulfilled, (state, action) => { state.isLoading = false; state.stores = action.payload; })
            .addCase(getStores.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })
            .addCase(getStoreReviews.pending, (state) => { state.reviewsLoading = true; })
            .addCase(getStoreReviews.fulfilled, (state, action) => { state.reviewsLoading = false; state.currentStoreReviews = action.payload; })
            .addCase(getStoreReviews.rejected, (state, action) => { state.reviewsLoading = false; state.error = action.payload; });
    },
});

export const { clearStoreError, updateStoreRating, clearReviews } = storeSlice.actions;
export default storeSlice.reducer;
