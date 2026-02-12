import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// Login
export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
    try {
        const { data } = await api.post('/auth/login', credentials);
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Signup
export const signup = createAsyncThunk('auth/signup', async (userData, { rejectWithValue }) => {
    try {
        const { data } = await api.post('/auth/signup', userData);
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Get current user
export const getMe = createAsyncThunk('auth/getMe', async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.get('/auth/me');
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Update password
export const updatePassword = createAsyncThunk('auth/updatePassword', async (passwords, { rejectWithValue }) => {
    try {
        const { data } = await api.put('/auth/update-password', passwords);
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Logout
export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.post('/auth/logout');
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: null,
        message: null,
    },
    reducers: {
        clearError: (state) => { state.error = null; },
        clearMessage: (state) => { state.message = null; },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(login.pending, (state) => { state.isLoading = true; state.error = null; })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Signup
            .addCase(signup.pending, (state) => { state.isLoading = true; state.error = null; })
            .addCase(signup.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(signup.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // GetMe
            .addCase(getMe.pending, (state) => { state.isLoading = true; })
            .addCase(getMe.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(getMe.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
            })
            // UpdatePassword
            .addCase(updatePassword.pending, (state) => { state.isLoading = true; state.error = null; })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.message = action.payload.message;
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Logout
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.isLoading = false;
            });
    },
});

export const { clearError, clearMessage } = authSlice.actions;
export default authSlice.reducer;
