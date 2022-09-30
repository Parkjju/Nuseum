import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const onSilentRefresh = () => {
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
            return decodedData;
        })
        .catch((err) => {
            console.log('err', err);
            if (err.response.data.detail === 'Token is blacklisted') {
                return 'TOKEN_BLACKLISTED';
            }
            if (err.response.data.detail === '"Token is invalid or expired"') {
                return 'REFRESH_EXPIRED';
            }
            // 리프레시토큰 만료
        });
};
