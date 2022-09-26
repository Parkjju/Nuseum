import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: [],
    image: [],
    isInitial: true,
};

const snackSlice = createSlice({
    name: 'snack',
    initialState,
    reducers: {
        isChanged(state) {
            state.isInitial = false;
        },
        getData(state, action) {
            state.data = [...state.data, action.payload];
        },
        getImage(state, action) {
            state.image = [...state.image, action.payload];
        },
        removeData(state, action) {
            let count = 0;
            for (let obj of state.data) {
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
        removeImage(state, action) {
            let count = 0;
            for (let obj of state.image) {
                if (obj.id === action.payload) {
                    break;
                }
                count += 1;
            }
            state.image = [
                ...state.image.slice(0, count),
                ...state.image.slice(count + 1),
            ];
        },
    },
});
export const snackActions = snackSlice.actions;
export default snackSlice.reducer;
