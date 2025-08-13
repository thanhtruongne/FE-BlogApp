import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthencationApi from '../apis/admin/Authencation.api';
import AuthorAPI from '../apis/Author.jsx';
import constants from '../utils/constants';
import { clearClientID, clearTokens, setClientID, setTokens } from '../utils/cookies';




const initialState = {
    currentUser: null,
    isAuthenticated: false,
    isAdmin: false,
    error: '',
    loading: false,
}

export const getUserCurrent = createAsyncThunk('user/currentUser', async (data, { rejectWithValue }) => {
    const response = await AuthencationApi.profile()
    if (response.status < 200 || response.status >= 300 || !response)
        return rejectWithValue(response)

    return response;

})

export const logOutUser = createAsyncThunk('author/logout', async (data, { rejectWithValue }) => {
    const response = await AuthorAPI.logoutForm()
    if (response.status < 200 || response.status >= 300 || !response)
        return rejectWithValue(response)

    return response;

})


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, request) => {
            //lưu token, client-id và refreshToken vào cookie
            setTokens(request.payload.tokens.access_token, request.payload.tokens.refresh_token)
            setClientID(request.payload.data._id)
        },
        clearMessgage: (state, action) => {
            state.message = '';
        },

        logout: (state) => {
            state.isAuthenticated = false;
            state.isAdmin = false;
            state.currentUser = null
            //lưu token và refreshToken vào cookie
            clearTokens()
            clearClientID();
        },



    },
    extraReducers: (builder) => {
        builder.addCase(getUserCurrent.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(getUserCurrent.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.currentUser = action.payload.data;
            state.isAdmin = action.payload.data.role == constants.ADMIN ? true : false;
        });

        builder.addCase(getUserCurrent.rejected, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.isAdmin = null;
            state.currentUser = null;
            state.error = 'Có lỗi xảy ra !!!';
        });


        builder.addCase(logOutUser.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(logOutUser.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.currentUser = null;
            state.isAdmin = false;
            clearTokens()
            clearClientID();
        });

        builder.addCase(logOutUser.rejected, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.isAdmin = null;
            state.currentUser = null;
            state.error = 'Có lỗi xảy ra !!!';
        });
    }
})

export const { login, logout, clearMessgage } = authSlice.actions

export default authSlice.reducer    