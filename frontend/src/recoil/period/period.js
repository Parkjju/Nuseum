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
