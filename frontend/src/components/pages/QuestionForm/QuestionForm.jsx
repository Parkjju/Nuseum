import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Name } from '../../atom/Card/styled';

import Container from '../../atom/Container';
import { Contents } from '../Home/styled';
import { DiaryTitle } from '../Record/styled';
import { Box, Button, Description, Input, Label } from './QuestionForm.style';

const QuestionForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
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
        if (window.confirm('질문을 등록할까요?')) {
            setLoading(true);
            try {
                await axios.post(
                    'https://cryptic-castle-40575.herokuapp.com/api/v1/qna/',
                    {
                        title,
                        content: description,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem(
                                'access_token'
                            )}`,
                        },
                    }
                );

                alert('질문 등록이 완료되었습니다!');
                navigate('/question');
            } catch (error) {
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
