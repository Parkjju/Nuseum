import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: [],
};
const supplementSlice = createSlice({
    name: 'supplement',
    initialState,
    reducers: {
        getData(state, action) {
            state.data = [...state.data, ...action.payload];
        },
        removeData(state, action) {
            let count = 0;
            for (let obj of state) {
                if (obj.id === action.payload) {
                    break;
                }
                count += 1;
            }
            state.data = [
                ...state.data.slice(0, count),
                ...state.data.slice(count + 1),
            ];
        },
        removeAll(state) {
            state.data = [];
        },
    },
});

export const supplementActions = supplementSlice.actions;
export default supplementSlice.reducer;
