import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../atom/Button';
import { Name } from '../../atom/Card/styled';
import Container from '../../atom/Container';
import QuestionCard from '../../molecules/QuestionCard';
import { Contents } from '../Home/styled';
import { DiaryTitle } from '../Record/styled';

const Question = () => {
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios
            .get('https://cryptic-castle-40575.herokuapp.com/api/v1/qna/', {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                        'access_token'
                    )}`,
                },
            })
            .then((response) => {
                setQuestions([...response.data.results]);
                setLoading(false);
            })
            .catch((err) =>
                alert('오류가 발생했습니다. 개발자에게 문의해주세요!')
            );
    }, []);

    return (
        <Container>
            {loading ? (
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '200px',
                    }}
                >
                    <CircularProgress sx={{ margin: '0px auto' }} />
                </div>
            ) : (
                <Contents>
                    <DiaryTitle layoutId={'question'}>
                        <Name style={{
                            fontSize: '16px',
                            fontWeight: 'bold'
                        }}>{'Q&A'}</Name>
                    </DiaryTitle>

                    {questions.map((item) => (
                        <QuestionCard
                            key={item.id}
                            data={item.title}
                            id={item.id}
                            isAnswered={item.is_answered}
                        />
                    ))}
                    <div style={{ height: '100px' }}></div>

                    <Link
                        style={{ textDecoration: 'none' }}
                        to='/question/post'
                    >
                        <Button text='문의하기' />
                    </Link>
                </Contents>
            )}
        </Container>
    );
};

export default Question;
