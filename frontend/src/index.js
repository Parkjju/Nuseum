import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { RecoilRoot } from 'recoil';
import axios from 'axios';
import store from './store/store';
import { Provider } from 'react-redux';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'https://www.nuseum.site/';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RecoilRoot>
        <Provider store={store}>
            <App />
        </Provider>
    </RecoilRoot>
);

serviceWorkerRegistration.register();
reportWebVitals();
