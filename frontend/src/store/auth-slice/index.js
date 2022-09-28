import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    token: null,
    expiration_time: null,
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.expiration_time = action.payload.expiration_time;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.token = null;
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
