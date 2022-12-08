import { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '../../atom/Container';
import { UserBox } from './Admin.style';
import { DiaryTitle } from '../Record/styled';
import { Name } from '../../atom/Card/styled';
import { Contents } from '../Home/styled';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';

const Admin = () => {
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const lang = useSelector((state) => state.language.isKorean);

    useEffect(() => {
        const isSuperUser = sessionStorage.getItem('is_superuser');
        if (!JSON.parse(isSuperUser)) {
            alert('담당자만 접근 가능한 페이지입니다.');
            navigate('/login');
        }
        setLoading(true);
        axios
            .get(
                'https://cryptic-castle-40575.herokuapp.com/api/v1/consumption/admin/',
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            'access_token'
                        )}`,
                    },
                }
            )
            .then((response) => {
                setUserList(response.data.userList);
                setLoading(false);
            })
            .catch((err) => {
                alert(
                    lang
                        ? 'An error has occurred. Please contact the developer!'
                        : '오류가 발생했습니다. 담당자에게 문의해주세요!'
                );
                if (err.response.status === 401) {
                    setLoading(false);
                    return;
                }
                setLoading(false);
            });
    }, []);

    return (
        <Container>
            <Contents>
                <DiaryTitle>
                    <Name>ADMIN</Name>
                </DiaryTitle>

                {loading ? (
                    <CircularProgress />
                ) : (
                    userList.map((user) => (
                        <UserBox
                            onClick={() =>
                                navigate(`./${user.id}/info`, {
                                    state: user.username,
                                })
                            }
                            key={user.id}
                        >
                            {user.username}
                        </UserBox>
                    ))
                )}
            </Contents>
        </Container>
    );
};

export default Admin;
