import { atom } from 'recoil';

export const periodState = atom({
    key: 'period',
    default: {
        breakfast: [],
        lunch: [],
        dinner: [],
        snack: [],
        supplement: [],
    },
});

export const mealImageState = atom({
    key: 'mealImage',
    default: {
        breakfast_img1: null,
        breakfast_img2: null,
        breakfast_img3: null,
        lunch_img1: null,
        lunch_img2: null,
        lunch_img3: null,
        dinner_img1: null,
        dinner_img2: null,
        dinner_img3: null,
        snack_img1: null,
        snack_img2: null,
        snack_img3: null,
    },
});
