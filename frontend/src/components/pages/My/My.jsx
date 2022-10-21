import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import handleExpired from '../../../helpers/handleExpired';
import { authActions } from '../../../store/auth-slice';
import Container from '../../atom/Container';
import { Contents } from '../Home/styled';

const My = () => {
    const token = useSelector((state) => state.auth.token);
    const [user, setUser] = useState('');
    const dispatch = useDispatch();

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
                {user === 'NPP02' ? (
                    <embed
                        src='https://s3.ap-northeast-2.amazonaws.com/jinhyung.test.aws/result/NPP02/2022.10.20+%EC%9D%BC%EB%B0%98%EA%B2%B0%EA%B3%BC%EC%A7%80+(NPP-02+%E3%84%B1%E3%85%8E%E3%84%B9).pdf#toolbar=0&navpanes=0&scrollbar=0'
                        type='application/pdf'
                        frameBorder='0'
                        scrolling='auto'
                        height={1000}
                        width='100%'
                    ></embed>
                ) : null}
            </Contents>
        </Container>
    );
};

export default My;
