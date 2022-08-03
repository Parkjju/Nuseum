import { atom, selector } from 'recoil';

export const periodState = atom({
    key: 'period',
    default: [],
});
export const derivedState = selector({
    key: 'derived',
    get: ({ get }) => {
        const originStateArray = get(periodState);
        return [
            originStateArray.filter((item) => item.period === 'breakfast'),
            originStateArray.filter((item) => item.period === 'lunch'),
            originStateArray.filter((item) => item.period === 'dinner'),
            originStateArray.filter((item) => item.period === 'snack'),
        ];
    },
});
