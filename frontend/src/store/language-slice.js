import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isKorean: false,
};

const languageSlice = createSlice({
    initialState,
    name: 'language',
    reducers: {
        changeLanguage(state) {
            state.isKorean = !state.isKorean;
        },
    },
});

export const languageActions = languageSlice.actions;
export default languageSlice.reducer;
