import Router from './router';
import { Helmet } from 'react-helmet';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import Footer from './components/atom/Footer';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from './store/auth-slice';
import jwt_decode from 'jwt-decode';

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

function App() {
    const pathname = window.location.pathname;
    const dispatch = useDispatch();
    useEffect(() => {
        if (pathname === '/login') {
            return;
        }

        axios
            .post(
                'https://nuseum-v2.herokuapp.com/api/v1/account/token/refresh/',
                {},
                {
                    headers: {
                        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxLCJpYXQiOjEsImp0aSI6ImFjZTcxMzE5YmVkMDQwYzFhMWMxODgyNGYzOWUzNTVlIiwidXNlcl9pZCI6MH0.P1e_v6fDHgG4qaODzLDvKTFgGBBNK7pmH_9M--MpfwA`,
                    },
                }
            )
            .then((response) => {
                const decodedData = jwt_decode(response.data.access);
                dispatch(
                    authActions.login({
                        token: response.data.access,
                        expiration_time: decodedData.exp,
                    })
                );
            })
            .catch((err) => {
                console.log(err);
                if (err.response.data.err_code === 'NOT_ACCEPTABLE') {
                    axios
                        .post(
                            'https://nuseum-v2.herokuapp.com/api/v1/account/login/',
                            {
                                username: loginId,
                                password: loginPassword,
                            }
                        )
                        .then((response) => {
                            const decodedData = jwt_decode(
                                response.data.access
                            );
                            dispatch(
                                authActions.login({
                                    token: response.data.access,
                                    expiration_time: decodedData.exp,
                                })
                            );
                        })
                        .catch((error) => {
                            console.log(error);
                            alert(
                                '서버 오류가 발생했습니다. 담당자에게 문의해주세요!'
                            );
                            setIsLoading(false);
                        });
                }
            });
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
