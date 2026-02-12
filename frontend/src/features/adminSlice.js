import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// Get dashboard stats
export const getDashboardStats = createAsyncThunk('admin/dashboard', async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.get('/admin/dashboard');
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Get all users
export const getUsers = createAsyncThunk('admin/getUsers', async (params, { rejectWithValue }) => {
    try {
        const { data } = await api.get('/admin/users', { params });
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Get user by ID
export const getUserById = createAsyncThunk('admin/getUserById', async (id, { rejectWithValue }) => {
    try {
        const { data } = await api.get(`/admin/users/${id}`);
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Add user
export const addUser = createAsyncThunk('admin/addUser', async (userData, { rejectWithValue }) => {
    try {
        const { data } = await api.post('/admin/users', userData);
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Get all stores (admin)
export const getAdminStores = createAsyncThunk('admin/getStores', async (params, { rejectWithValue }) => {
    try {
        const { data } = await api.get('/admin/stores', { params });
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Add store
export const addStore = createAsyncThunk('admin/addStore', async (storeData, { rejectWithValue }) => {
    try {
        const { data } = await api.post('/admin/stores', storeData);
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Update user
export const updateUser = createAsyncThunk('admin/updateUser', async ({ id, userData }, { rejectWithValue }) => {
    try {
        const { data } = await api.put(`/admin/users/${id}`, userData);
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Update store
export const updateStore = createAsyncThunk('admin/updateStore', async ({ id, storeData }, { rejectWithValue }) => {
    try {
        const { data } = await api.put(`/admin/stores/${id}`, storeData);
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Get store by ID
export const getStoreById = createAsyncThunk('admin/getStoreById', async (id, { rejectWithValue }) => {
    try {
        const { data } = await api.get(`/stores/${id}`);
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        stats: null,
        users: [],
        stores: [],
        selectedUser: null,
        selectedStore: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        clearAdminError: (state) => { state.error = null; },
        clearSelectedUser: (state) => { state.selectedUser = null; },
        clearSelectedStore: (state) => { state.selectedStore = null; },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDashboardStats.pending, (state) => { state.isLoading = true; })
            .addCase(getDashboardStats.fulfilled, (state, action) => { state.isLoading = false; state.stats = action.payload; })
            .addCase(getDashboardStats.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })
            .addCase(getUsers.pending, (state) => { state.isLoading = true; })
            .addCase(getUsers.fulfilled, (state, action) => { state.isLoading = false; state.users = action.payload; })
            .addCase(getUsers.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })
            .addCase(getUserById.pending, (state) => { state.isLoading = true; })
            .addCase(getUserById.fulfilled, (state, action) => { state.isLoading = false; state.selectedUser = action.payload; })
            .addCase(getUserById.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })
            .addCase(addUser.pending, (state) => { state.isLoading = true; })
            .addCase(addUser.fulfilled, (state) => { state.isLoading = false; })
            .addCase(addUser.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })
            .addCase(getAdminStores.pending, (state) => { state.isLoading = true; })
            .addCase(getAdminStores.fulfilled, (state, action) => { state.isLoading = false; state.stores = action.payload; })
            .addCase(getAdminStores.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })
            .addCase(addStore.pending, (state) => { state.isLoading = true; })
            .addCase(addStore.fulfilled, (state) => { state.isLoading = false; })
            .addCase(addStore.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })
            .addCase(updateUser.pending, (state) => { state.isLoading = true; })
            .addCase(updateUser.fulfilled, (state) => { state.isLoading = false; })
            .addCase(updateUser.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })
            .addCase(updateStore.pending, (state) => { state.isLoading = true; })
            .addCase(updateStore.fulfilled, (state) => { state.isLoading = false; })
            .addCase(updateStore.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })
            .addCase(getStoreById.pending, (state) => { state.isLoading = true; })
            .addCase(getStoreById.fulfilled, (state, action) => { state.isLoading = false; state.selectedStore = action.payload; })
            .addCase(getStoreById.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; });
    },
});

export const { clearAdminError, clearSelectedUser, clearSelectedStore } = adminSlice.actions;
export default adminSlice.reducer;
