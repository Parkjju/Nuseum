import { atom, selector } from 'recoil';

export const periodState = atom({
    key: 'period',
    default: {
        breakfast: undefined,
        lunch: undefined,
        dinner: undefined,
        snack: undefined,
    },
});
export const breakFast = selector({
    key: 'derived',
    get: ({ get }) => {
        const originStateArray = get(periodState);
        return { ...originStateArray.breakfast };
    },
});

export const lunch = selector({
    key: 'derived',
    get: ({ get }) => {
        const originStateArray = get(periodState);
        return { ...originStateArray.lunch };
    },
});
export const dinner = selector({
    key: 'derived',
    get: ({ get }) => {
        const originStateArray = get(periodState);
        return { ...originStateArray.dinner };
    },
});
export const snack = selector({
    key: 'derived',
    get: ({ get }) => {
        const originStateArray = get(periodState);
        return { ...originStateArray.snack };
    },
});
