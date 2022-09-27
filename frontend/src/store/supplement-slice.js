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
            state.data = [
                ...state.data.slice(0, action.payload),
                ...state.data.slice(action.payload + 1),
            ];
        },
        removeAll(state) {
            state.data = [];
        },
        addData(state, action) {
            state.data = [...state.date, action.payload];
        },
        modifyData(state, action) {
            state.data[action.payload.index][action.payload.type] =
                action.payload.data;
        },
        checkDataSaved(state) {
            for (let index in state.data) {
                state.data[index].saved = true;
            }
        },
    },
});

export const supplementActions = supplementSlice.actions;
export default supplementSlice.reducer;
