import { atom } from 'recoil';

export const dateState = atom({
    key: 'date',
    default: new Date(),
});
