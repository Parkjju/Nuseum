import { CircularProgress } from '@mui/material';
import { fontWeight } from '@mui/system';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Name } from '../../atom/Card/styled';
import Container from '../../atom/Container';
import { Contents } from '../Home/styled';
import { DiaryTitle } from '../Record/styled';
import postImage from '../../../assets/postComment.png';
import {
    Answer,
    AnswerBox,
    AnswerContent,
    InputComment,
    QuestionBox,
    QuestionContent,
    QuestionTitle,
    Username,
} from './QuestionDetail.style';

const QuestionDetail = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [answerData, setAnswerData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState('');
    const [isPosted, setIsPosted] = useState(false);
    const param = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(
                `https://cryptic-castle-40575.herokuapp.com/api/v1/qna/${param.id}/`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            'access_token'
                        )}`,
                    },
                }
            )
            .then((response) => {
                console.log(response.data);
                setContent(response.data.question.content);
                setAnswerData([...response.data.answerList]);
                setTitle(response.data.question.title);
            });
        setLoading(false);
    }, [isPosted]);

    const deleteComment = (id) => {
        if (window.confirm('댓글을 지우시겠어요?')) {
            setLoading(true);
            axios
                .delete(
                    `https://cryptic-castle-40575.herokuapp.com/api/v1/qna/answer/${id}/`,
                    {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem(
                                'access_token'
                            )}`,
                        },
                    }
                )
                .then(() => {
                    alert('해당 댓글을 삭제하였습니다!');
                    setLoading(false);
                    setIsPosted((prev) => !prev);
                })
                .catch((err) => {
                    if (err.response.data.validation_err) {
                        alert('작성자 본인만 삭제할 수 있습니다.');
                        setLoading(false);
                        return;
                    }
                    alert('오류가 발생했습니다. 담당자에게 문의해주세요!');
                    setLoading(false);
                });
        }
    };
    const onChangeComment = (e) => {
        setComment(e.target.value);
    };

    const postComment = async (e) => {
        if (e.keyCode === 13) {
            if (window.confirm('댓글을 입력하시겠어요?')) {
                setLoading(true);

                try {
                    await axios.post(
                        `https://cryptic-castle-40575.herokuapp.com/api/v1/qna/${param.id}/answer/`,
                        {
                            content: comment,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${sessionStorage.getItem(
                                    'access_token'
                                )}`,
                            },
                        }
                    );
                } catch (error) {
                    console.log(error);
                    alert('오류가 발생했습니다. 담당자에게 문의해주세요!');
                }
                setLoading(false);
                setComment('');
                setIsPosted((prev) => !prev);
            } else {
                return;
            }
        } else {
            return;
        }
    };

    return (
        <Container>
            {loading ? (
                <div
                    style={{
                        width: '100%',
                        justifyContent: 'center',
                        display: 'flex',
                    }}
                >
                    <CircularProgress sx={{ margin: '0px auto' }} />
                </div>
            ) : (
                <Contents>
                    <DiaryTitle layoutId={'question'}>
                        <Name>{'Q&A'}</Name>
                    </DiaryTitle>
                    <QuestionBox>
                        <QuestionTitle>
                            <span style={{ marginRight: 5, fontSize: 16 }}>
                                Q.
                            </span>
                            <span style={{ fontSize: 14, fontWeight: 500 }}>
                                {title}
                            </span>
                        </QuestionTitle>
                        <QuestionContent>{content}</QuestionContent>
                    </QuestionBox>
                    <AnswerBox>
                        {answerData.map((answer) => (
                            <Answer key={answer.id}>
                                <Username>
                                    <span>{answer.author}</span>
                                    <span
                                        style={{
                                            borderBottom: '1px solid black',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => deleteComment(answer.id)}
                                    >
                                        지우기
                                    </span>
                                </Username>
                                <AnswerContent>{answer.content}</AnswerContent>
                            </Answer>
                        ))}
                    </AnswerBox>
                    <>
                        <InputComment
                            onKeyDown={postComment}
                            placeholder='댓글을 입력하세요...'
                            value={comment}
                            onChange={onChangeComment}
                        />
                        <div
                            style={{
                                width: '80%',
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <img
                                src={postImage}
                                alt='post'
                                style={{
                                    width: 23,
                                    position: 'relative',
                                    top: -28,
                                    left: -20,
                                }}
                            />
                        </div>
                    </>
                </Contents>
            )}
        </Container>
    );
};

export default QuestionDetail;
