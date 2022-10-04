import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import handleExpired from '../../../helpers/handleExpired';
import { authActions } from '../../../store/auth-slice';
import { Name } from '../../atom/Card/styled';

import Container from '../../atom/Container';
import { Contents } from '../Home/styled';
import { DiaryTitle } from '../Record/styled';
import { Box, Button, Description, Input, Label } from './QuestionForm.style';

const QuestionForm = () => {
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const location = useLocation();
    const [title, setTitle] = useState(
        location.state ? location.state.title : ''
    );
    const [description, setDescription] = useState(
        location.state ? location.state.content : ''
    );

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const onChangeTitle = useCallback((e) => {
        setTitle(e.target.value);
    }, []);
    const onChangeDescription = useCallback((e) => {
        setDescription(e.target.value);
    }, []);
    const onClick = async () => {
        if (title === '' || description === '') {
            alert('제목과 내용은 필수 입력입니다.');
            return;
        }
        if (
            location?.state?.id
                ? window.confirm('질문을 수정할까요?')
                : window.confirm('질문을 등록할까요?')
        ) {
            setLoading(true);
            try {
                if (location?.state?.id) {
                    await axios.patch(
                        `/api/v1/qna/${location.state.id}/edit/`,
                        {
                            title,
                            content: description,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                } else {
                    try {
                        await axios.post(
                            '/api/v1/qna/',
                            {
                                title,
                                content: description,
                            },
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        );
                    } catch (err) {
                        console.log(err);
                        if (err.response.status === 401) {
                            const { exp, token } = await handleExpired();
                            dispatch(
                                authActions.login({
                                    token: token.data.access,
                                    exp,
                                })
                            );
                        } else {
                            alert(
                                '오류가 발생했습니다. 담당자에게 문의해주세요!'
                            );
                        }
                        setLoading(false);
                    }
                }

                if (location?.state?.id) {
                    alert('질문 수정이 완료되었습니다!');
                } else {
                    alert('질문 등록이 완료되었습니다!');
                }

                navigate('/question');
            } catch (error) {
                console.log(error);
                alert('오류가 발생했습니다. 담당자에게 문의해주세요!');
            }
            setLoading(false);
        }
    };

    return (
        <Container>
            <Contents>
                <DiaryTitle layoutId={'question'}>
                    <Name>{'Q&A'}</Name>
                </DiaryTitle>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <>
                        <Box>
                            <Label>제목</Label>
                            <Input
                                value={title}
                                onChange={onChangeTitle}
                                required
                                placeholder='제목을 입력해주세요.'
                            />
                        </Box>
                        <Box>
                            <Label>문의 내용</Label>
                            <Description
                                value={description}
                                onChange={onChangeDescription}
                                required
                                placeholder='내용을 작성해주세요.'
                            />
                        </Box>
                        <Button onClick={onClick}>작성 완료</Button>
                    </>
                )}
            </Contents>
        </Container>
    );
};

export default QuestionForm;
