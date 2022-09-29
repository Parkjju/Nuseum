import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    date: new Date().getTime(),
};
const dateSlice = createSlice({
    name: 'date',
    initialState,
    reducers: {
        updateDate(state, action) {
            state.date = action.payload;
        },
    },
});

export const dateActions = dateSlice.actions;
export default dateSlice.reducer;
