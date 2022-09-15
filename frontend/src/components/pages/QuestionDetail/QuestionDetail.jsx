import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
    UtilBtn,
    UtilGroup,
    UtilImg,
} from './QuestionDetail.style';
import { Button } from '../QuestionForm/QuestionForm.style';
import modify from '../../../assets/modifyImg.png';
import deleteImg from '../../../assets/deleteImg.png';

const QuestionDetail = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [answerData, setAnswerData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState('');
    const [isPosted, setIsPosted] = useState(false);
    const navigate = useNavigate();
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
                setLoading(false);
            })
            .catch((err) => {
                alert('오류가 발생했습니다. 담당자에게 문의해주세요!');
                setLoading(false);
            });
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
    const deletePost = async () => {
        if (window.confirm('작성한 질문을 삭제하시겠어요?')) {
            try {
                await axios.delete(
                    `https://cryptic-castle-40575.herokuapp.com/api/v1/qna/${param.id}/delete/`,
                    {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem(
                                'access_token'
                            )}`,
                        },
                    }
                );
                alert('질문이 삭제되었습니다!');
                navigate('/question');
            } catch (error) {
                alert('오류가 발생했습니다. 담당자에게 문의해주세요!');
            }
        }
    };

    const modifyPost = () => {
        if (window.confirm('질문 내용을 수정할까요?')) {
            navigate(`/question/post/`, {
                state: { title, content, id: param.id },
            });
        }
    };

    const postComment = async (e) => {
        if (e.keyCode === 13) {
            if (e.target.value === '') {
                return;
            }
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
                    <div
                        style={{
                            width: '80%',
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <UtilGroup onClick={modifyPost}>
                            <UtilImg src={modify} alt='modify' />
                            <UtilBtn>수정</UtilBtn>
                        </UtilGroup>
                        <UtilGroup
                            style={{ display: 'flex', alignItems: 'center' }}
                            onClick={deletePost}
                        >
                            <UtilImg src={deleteImg} alt='delete' />
                            <UtilBtn>삭제</UtilBtn>
                        </UtilGroup>
                    </div>
                    <Link to='/question' style={{ textDecoration: 'none' }}>
                        <Button style={{ marginTop: 30 }}>목록</Button>
                    </Link>
                </Contents>
            )}
        </Container>
    );
};

export default QuestionDetail;
