import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    amount: 0,
    id: null,
};

const waterSlice = createSlice({
    name: 'water',
    initialState,
    reducers: {
        addWaterAmount(state, action) {
            state.amount = state.amount + action.payload;
        },
        removeAll(state) {
            state.amount = 0;
        },
        getId(state, action) {
            state.id = action.payload;
        },
    },
});

export const waterActions = waterSlice.actions;
export default waterSlice.reducer;
