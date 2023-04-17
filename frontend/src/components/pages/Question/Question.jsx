import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../../atom/Button';
import { Name } from '../../atom/Card/styled';
import Container from '../../atom/Container';
import QuestionCard from '../../molecules/QuestionCard';
import { Contents } from '../Home/styled';
import { DiaryTitle } from '../Record/styled';

const Question = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);
    const token = useSelector((state) => state.auth.token);
    const lang = useSelector((state) => state.language.isKorean);
    //
    useEffect(() => {
        setLoading(true);
        axios
            .get('/api/v1/qna/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setQuestions([...response.data.results]);
                console.log(response.data);
                setLoading(false);
            })
            .catch(async (err) => {
                console.log(err);
                if (err.response.status === 401) {
                    setLoading(false);
                    return;
                }
                alert(
                    lang
                        ? 'An error has occurred. Please contact the developer!'
                        : '오류가 발생했습니다. 담당자에게 문의해주세요!'
                );
                setLoading(false);
            });
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
                <Contents style={{}}>
                    <DiaryTitle layoutId={'question'}>
                        <Name style={{marginBottom: '20px', fontSize:'20px'}}>{'Q&A'}</Name>
                    </DiaryTitle>
                        <Name style={{marginBottom: '20px', lineHeight: 1.3}}>뉴지엄의 성장을 위해 좋았던 점,{'\n'} 개선될 점 등을 남겨주세요 :)</Name>
                        <div style={{width: '82%', display:'flex', flexDirection: 'column', 
                        alignItems:'center',marginBottom: '50px', maxHeight: '80vh', overflowY:'scroll', padding:' 0 8px'}}>
                            {questions.map((item) => (
                                <QuestionCard
                                    key={item.id}
                                    data={item.title}
                                    id={item.id}
                                    isAnswered={item.is_answered}
                                    author={item.author}
                                />
                            ))}
                        </div>
                        <Link
                            style={{ textDecoration: 'none', position:'fixed', bottom:'5vh',zIndex:10}}
                            to='/question/post'
                        >
                            <Button text={lang ? 'Contact us' : '문의하기'} />
                        </Link>
                </Contents>
            )}
        </Container>
    );
};

export default Question;
