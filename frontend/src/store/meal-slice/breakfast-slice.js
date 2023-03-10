import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isChanged: false,
    data: [],
    image: [],
    removingData: null,
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
            let copy = [...action.payload];

            for (let index in copy) {
                // amount / food / id / name / post
                let copyObj = { ...copy[index] };

                for (let key in copy[index]) {
                    if (
                        key === 'amount' ||
                        key === 'name' ||
                        key === 'food' ||
                        key === 'id' ||
                        key === 'post'
                    )
                        continue;
                    // amount 비율에 따라 영양성분 재계산 로직
                    // 100 : amount = 100g기준 nutrition : amount g 기준 nutrition
                    copyObj[key] = (copyObj[key] * copyObj.amount) / 100;
                    // obj[key] = (obj[key] * obj.amount) / 100;
                }
                copy[index] = { ...copyObj };
            }

            state.data = [...state.data, ...copy];
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
                    state.removingData = { ...obj };
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
        subtractNutrition(state, action) {
            for (let key in state.nutrition) {
                // 바로 리턴해도 되는지 추후 로직 검토 필요
                if (state.nutrition[key] < action.payload[key]) {
                    return;
                }
                state.nutrition[key] -= action.payload[key];
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
