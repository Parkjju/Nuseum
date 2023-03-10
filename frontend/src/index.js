import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import store from './store/store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'https://www.nuseum.site/';
// axios.defaults.baseURL = 'http://localhost:8000/';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </Provider>
);

serviceWorkerRegistration.register();
reportWebVitals();
