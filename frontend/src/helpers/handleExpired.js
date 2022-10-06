import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const checkBrowser = () => {
    let userAgent = navigator.userAgent;
    let browserName;

    if (userAgent.match(/chrome|chromium|crios/i)) {
        browserName = 'chrome';
    } else if (userAgent.match(/firefox|fxios/i)) {
        browserName = 'firefox';
    } else if (userAgent.match(/safari/i)) {
        browserName = 'safari';
    } else if (userAgent.match(/opr\//i)) {
        browserName = 'opera';
    } else if (userAgent.match(/edg/i)) {
        browserName = 'edge';
    } else {
        browserName = 'No browser detection';
    }

    return browserName;
};

export const handleExpired = async () => {
    try {
        const response = await axios.post(
            '/api/v1/account/token/refresh/',
            {},
            {
                headers: {
                    Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxLCJpYXQiOjEsImp0aSI6ImFjZTcxMzE5YmVkMDQwYzFhMWMxODgyNGYzOWUzNTVlIiwidXNlcl9pZCI6MH0.P1e_v6fDHgG4qaODzLDvKTFgGBBNK7pmH_9M--MpfwA`,
                },
            }
        );
        const decodedData = jwt_decode(response.data.access);
        return { token: response, exp: decodedData.exp };
    } catch (err) {
        switch (err.response.data.detail) {
            case 'Token is blacklisted':
                return (() => {
                    alert(
                        '다른 기기에서의 접속이 이루어졌습니다. 다시 로그인해주세요!'
                    );
                    location.pathname = '/login';
                })();
            case 'Token is invalid or expired':
                return (() => {
                    alert('세션이 만료되었습니다. 다시 로그인해주세요!');
                    location.pathname = '/login';
                })();
            default:
                return (() => {
                    if (checkBrowser() === 'safari') {
                        return;
                    }
                    alert(
                        '알 수 없는 오류가 발생하였습니다. 담당자에게 문의해주세요!'
                    );
                })();
        }
    }
};

export default handleExpired;
