import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { RecoilRoot } from 'recoil';
import axios from 'axios';

axios.defaults.withCredentials = true;
// axios.defaults.baseURL = 'http://localhost:8000';
// axios.defaults.baseURL = 'https://cryptic-castle-40575.herokuapp.com';
axios.defaults.baseURL =
    process.env.NODE_ENV === 'development'
        ? '/'
        : 'https://cryptic-castle-40575.herokuapp.com';

console.log(process.env.NODE_ENV);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RecoilRoot>
            <App />
        </RecoilRoot>
    </React.StrictMode>
);

serviceWorkerRegistration.register();
reportWebVitals();
