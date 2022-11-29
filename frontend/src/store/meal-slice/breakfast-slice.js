import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isChanged: false,
    data: [],
    image: [],
    nutrition: {
        energy: 0,
        protein: 0,
        fat: 0,
        carbohydrate: 0,
        dietary_fiber: 0,
        magnesium: 0,
        vitamin_a: 0,
        vitamin_d: 0,
        vitamin_b6: 0,
        folic_acid: 0,
        vitamin_b12: 0,
        tryptophan: 0,
        dha_epa: 0,
    },
};

const breakfastSlice = createSlice({
    name: 'breakfast',
    initialState,
    reducers: {
        getData(state, action) {
            state.data = [...state.data, ...action.payload];
        },
        getImage(state, action) {
            if (typeof action.payload === 'object') {
                state.image = [...state.image, ...action.payload];
            } else {
                state.image = [...state.image, ...action.payload];
            }
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
        removeAll(state) {
            state.data = [];
            state.image = [];
        },
        isChanged(state) {
            state.isChanged = true;
        },
        setNutrition(state, action) {
            for (let key in state.nutrition) {
                state.nutrition[key] += action.payload[key];
            }
        },
        initializeNutrition(state) {
            state.nutrition = {
                energy: 0,
                protein: 0,
                fat: 0,
                carbohydrate: 0,
                dietary_fiber: 0,
                magnesium: 0,
                vitamin_a: 0,
                vitamin_d: 0,
                vitamin_b6: 0,
                folic_acid: 0,
                vitamin_b12: 0,
                tryptophan: 0,
                dha_epa: 0,
            };
        },
    },
});

export const breakfastActions = breakfastSlice.actions;
export default breakfastSlice.reducer;
