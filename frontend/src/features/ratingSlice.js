import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// Submit or update rating
export const submitRating = createAsyncThunk('ratings/submit', async ({ storeId, rating, review }, { rejectWithValue }) => {
    try {
        const { data } = await api.post(`/ratings/${storeId}`, { rating, review });
        return { ...data, storeId, ratingValue: rating, review };
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Get my store ratings (owner)
export const getMyStoreRatings = createAsyncThunk('ratings/myStore', async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.get('/ratings/my-store');
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const ratingSlice = createSlice({
    name: 'ratings',
    initialState: {
        myStoreData: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        clearRatingError: (state) => { state.error = null; },
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitRating.pending, (state) => { state.isLoading = true; })
            .addCase(submitRating.fulfilled, (state) => { state.isLoading = false; })
            .addCase(submitRating.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })
            .addCase(getMyStoreRatings.pending, (state) => { state.isLoading = true; })
            .addCase(getMyStoreRatings.fulfilled, (state, action) => { state.isLoading = false; state.myStoreData = action.payload; })
            .addCase(getMyStoreRatings.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; });
    },
});

export const { clearRatingError } = ratingSlice.actions;
export default ratingSlice.reducer;
