import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: [],
    image: [],
};
const postSlice = createSlice({
    name: 'mealPost',
    initialState,
    reducers: {
        addPostData(state, action) {
            state.data = [...state.data, action.payload];
        },
        addPostImage(state, action) {
            state.image = [...state.image, action.payload];
        },
        removePostData(state, action) {
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
        removePostimage(state, action) {
            state.image = [
                ...state.image.slice(0, action.payload),
                ...state.image.slice(action.payload + 1),
            ];
        },
        removeAll(state) {
            state.data = [];
            state.image = [];
        },
    },
});

export const postActions = postSlice.actions;
export default postSlice.reducer;
