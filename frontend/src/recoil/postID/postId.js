import { atom } from 'recoil';

export const postIdState = atom({
    key: 'postId',
    default: {
        id: null,
    },
});
