import Router from './router';
import { Helmet } from 'react-helmet';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import Footer from './components/atom/Footer';
import { useEffect, useState } from 'react';
import SimpleSnackbar from './components/atom/SimpleSnackbar/SimpleSnackbar';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import handleExpired from './helpers/handleExpired';
import { authActions } from './store/auth-slice';
import axios from 'axios';

const GlobalStyle = createGlobalStyle`
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
input, textarea{
    font-family: 'Noto Serif KR', serif;
}

html,body {
    font-family: 'Noto Serif KR', serif;
	line-height: 1;
    min-height:800px;
}



button{
    font-family: 'Noto Serif KR', serif;
}
ol, ul {
	list-style: none;
}

input::placeholder{
    font-family: 'Noto Serif KR', serif;
}

body{
    
    max-width:800px;
    margin:auto;
}

`;

const isUpdateAvailable = window.sessionStorage.getItem('updated');

function App() {
    const pathname = window.location.pathname;
    const token = useSelector((state) => state.auth.token);

    const dispatch = useDispatch();
    useEffect(() => {
        if (!token) {
            axios
                .post(
                    '/api/v1/account/token/refresh/',
                    {},
                    {
                        headers: {
                            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxLCJpYXQiOjEsImp0aSI6ImFjZTcxMzE5YmVkMDQwYzFhMWMxODgyNGYzOWUzNTVlIiwidXNlcl9pZCI6MH0.P1e_v6fDHgG4qaODzLDvKTFgGBBNK7pmH_9M--MpfwA`,
                        },
                    }
                )
                .then((response) => {
                    const { exp } = jwt_decode(response.data.access);
                    dispatch(
                        authActions.login({
                            token: response.data.access,
                            exp,
                        })
                    );
                });

            return;
        }
        const { exp } = jwt_decode(token);
        setTimeout(async () => {
            const { exp, token } = await handleExpired();

            dispatch(
                authActions.login({
                    token: token.data.access,
                    exp,
                })
            );
            console.log('token refreshed!');
        }, exp * 1000 - Date.now() - 5000);
    }, [token]);
    useEffect(() => {
        if (pathname === '/login') {
            return;
        }
    }, []);

    return (
        <>
            <Helmet>
                <link
                    rel='stylesheet'
                    href='https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0'
                />
                <link
                    href='https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@200;300;400;500;600;700;900&display=swap'
                    rel='stylesheet'
                />
            </Helmet>
            <>
                <GlobalStyle />

                {JSON.parse(isUpdateAvailable) ? <SimpleSnackbar /> : null}
                <Router />
            </>
            {ReactDOM.createPortal(
                <Footer />,
                document.querySelector('#footer')
            )}
        </>
    );
}

export default App;
