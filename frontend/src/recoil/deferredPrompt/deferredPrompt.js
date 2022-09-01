import { atom } from 'recoil';

export const deferredPromptState = atom({
    key: 'deferred',
    default: null,
});
