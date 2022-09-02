import { atom } from 'recoil';

export const periodState = atom({
    key: 'period',
    default: {
        breakfast: {
            data: [],
            image: [],
        },
        lunch: {
            data: [],
            image: [],
        },
        dinner: {
            data: [],
            image: [],
        },
        snack: {
            data: [],
            image: [],
        },
    },
});

export const mealImageState = atom({
    key: 'mealImage',
    default: {
        breakfast: [],
        lunch: [],
        dinner: [],
        snack: [],
        supplement: [],
    },
});
