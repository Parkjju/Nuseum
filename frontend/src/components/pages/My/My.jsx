import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import handleExpired from '../../../helpers/handleExpired';
import { authActions } from '../../../store/auth-slice';
// import { Document, Page } from 'react-pdf';
import Container from '../../atom/Container';
import { Contents } from '../Home/styled';

const My = () => {
    const token = useSelector((state) => state.auth.token);
    const [user, setUser] = useState('');

    useEffect(() => {
        axios
            .get('/api/v1/result/examination/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => setUser(response.data.user));
    }, []);

    return (
        <Container>
            <Contents>
                {user === 'NPP02' || user === '오이' ? (
                    <object
                        data='https://s3.ap-northeast-2.amazonaws.com/jinhyung.test.aws/result/NPP02/2022.10.20+%EC%9D%BC%EB%B0%98%EA%B2%B0%EA%B3%BC%EC%A7%80+(NPP-02+%E3%84%B1%E3%85%8E%E3%84%B9).pdf'
                        type='application/pdf'
                        width='100%'
                        height='1000px'
                    ></object>
                ) : null}
            </Contents>
        </Container>
    );
};

export default My;
