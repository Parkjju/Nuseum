import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth-slice';
import dateSlice from './date-slice';

// directory 묶어서 관리 가능한지 여부 확인
import breakfastSlice from './meal-slice/breakfast-slice';
import dinnerSlice from './meal-slice/dinner-slice';
import lunchSlice from './meal-slice/lunch-slice';
import postSlice from './meal-slice/post-slice';
import snackSlice from './meal-slice/snack-slice';
import supplementSlice from './supplement-slice';
import waterSlice from './water-slice';
import todaySlice from './today-slice';
const store = configureStore({
    reducer: {
        today: todaySlice,
        auth: authSlice,
        breakfast: breakfastSlice,
        lunch: lunchSlice,
        dinner: dinnerSlice,
        snack: snackSlice,
        supplement: supplementSlice,
        post: postSlice,
        water: waterSlice,
        date: dateSlice,
    },
});

export default store;
