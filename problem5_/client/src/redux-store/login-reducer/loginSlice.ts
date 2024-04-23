import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState, } from '@/redux-store/store';
import axios from 'axios';
import { config } from '@/utils/configAxios/config';
const serverUrl = "http://localhost:3000/v1/api";
export interface AuthenticationState {
    jwtToken: any;
    email: any;
    userID: any;
    status: 'loading' | 'failed' | 'idle';
}

const initialState: AuthenticationState = {
    jwtToken: null,
    email: null,
    userID: null,
    status: "idle",
};

export const loginAsync = createAsyncThunk(
    'authentication/login',
    async (user: any) => {
        try {

            const { email, password } = user;
            const response = await axios.post(serverUrl + '/user/login', { email, password });
            console.log("response", response.data.message.metadata);
            const data = response.data.message.metadata
            localStorage.setItem("user", JSON.stringify(data.shop));
            localStorage.setItem("token", data.tokens.accessToken);
            return response.data.message.metadata;
        } catch (error) {
            console.log("error", error);
            throw error;
        }

    }
);
export const registerAsync = createAsyncThunk(
    'authentication/register',
    async (user: any) => {
        try {
            const { email, password, firstName, lastName } = user;
            const response = await axios.post(serverUrl + '/user/signup', { email, password, firstName, lastName })
            console.log("response 1111", response.data);

            return response.data;
        } catch (error) {
            status = 'failed';
            console.log("error", error);

        }

    }
);
export const logoutAsync = createAsyncThunk(
    'authentication/logout',
    async () => {
        await axios.post(serverUrl + '/user/logout', {} , config)
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }
);
export const LoginSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.jwtToken = action.payload.accessToken;
                state.email = action.payload.email;
                state.userID = action.payload.id;
            }).addCase(loginAsync.rejected, (state) => {
                state.status = 'failed';

            })
            .addCase(registerAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(registerAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.email = action.payload.email;
            }).addCase(registerAsync.rejected, (state) => {
                state.status = 'failed';

            })
            .addCase(logoutAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.jwtToken = "";
                state.email = "";
                state.userID = "";
            })

    },
});

export const getJWTToken = (state: RootState) => state.authenticationState.jwtToken;
export const getUserFullname = (state: RootState) => state.authenticationState.email;
export const getUserID = (state: RootState) => state.authenticationState.userID;
export const getStatus = (state: RootState) => state.authenticationState.status;

export default LoginSlice.reducer;  