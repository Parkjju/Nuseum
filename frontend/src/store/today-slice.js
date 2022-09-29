import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    data: [],
};
const todaySlice = createSlice({
    initialState,
    name: 'today',
    reducers: {
        getTodayData(state, action) {
            state.data = [...state.data, ...action.payload];
        },
        removeAll(state) {
            state.data = [];
        },
    },
});

export const todayActions = todaySlice.actions;
export default todaySlice.reducer;
