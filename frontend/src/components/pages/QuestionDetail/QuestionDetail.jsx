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
import { useSelector } from 'react-redux';

const QuestionDetail = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [answerData, setAnswerData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState('');
    const [isPosted, setIsPosted] = useState(false);
    const [date, setDate] = useState(null);
    const navigate = useNavigate();
    const param = useParams();
    const token = useSelector((state) => state.auth.token);
    const [author, setAuthor] = useState(null);
    const lang = useSelector((state) => state.language.isKorean);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`/api/v1/qna/${param.id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setAuthor(response.data.question.author);
                setContent(response.data.question.content);
                setAnswerData([...response.data.answerList]);
                setTitle(response.data.question.title);
                setDate(response.data.question.created_at);
                setLoading(false);
            })
            .catch(async (err) => {
                console.log(err);
                if (err.response.status === 404) {
                    alert(
                        lang
                            ? 'This post has already been deleted.'
                            : '이미 삭제된 게시물입니다.'
                    );
                    navigate('/question');
                    return;
                }
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
    }, [isPosted]);

    const deleteComment = (id) => {
        if (
            window.confirm(
                lang ? 'Should I register a comment?' : '댓글을 지우시겠어요?'
            )
        ) {
            setLoading(true);
            axios
                .delete(`/api/v1/qna/answer/${id}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(() => {
                    alert(
                        lang
                            ? 'Your comment deletion has been completed!'
                            : '해당 댓글을 삭제하였습니다!'
                    );
                    setLoading(false);
                    setIsPosted((prev) => !prev);
                })
                .catch(async (err) => {
                    if (err.response.data.validation_err) {
                        alert(
                            lang
                                ? 'Only the author himself can delete the comment.'
                                : '작성자 본인만 삭제할 수 있습니다.'
                        );
                        setLoading(false);
                        return;
                    }
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
        }
    };
    const onChangeComment = (e) => {
        setComment(e.target.value);
    };
    const deletePost = async () => {
        if (
            window.confirm(
                lang
                    ? 'Should I register a question?'
                    : '작성한 질문을 삭제하시겠어요?'
            )
        ) {
            try {
                await axios.delete(`/api/v1/qna/${param.id}/delete/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                alert(
                    lang
                        ? 'Your question has been deleted!'
                        : '질문이 삭제되었습니다!'
                );
                navigate('/question');
            } catch (error) {
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
            }
        }
    };
    console.log(author);

    const modifyPost = () => {
        if (
            window.confirm(
                lang
                    ? 'Should I correct the question?'
                    : '질문 내용을 수정할까요?'
            )
        ) {
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
            if (
                window.confirm(
                    lang
                        ? 'Should I register the comment?'
                        : '댓글을 입력하시겠어요?'
                )
            ) {
                setLoading(true);

                try {
                    await axios.post(
                        `/api/v1/qna/${param.id}/answer/`,
                        {
                            content: comment,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                } catch (err) {
                    if (err.response.status === 401) {
                        setLoading(false);
                        return;
                    }
                    alert(
                        lang
                            ? 'An error has occurred. Please contact the developer!'
                            : '오류가 발생했습니다. 담당자에게 문의해주세요!'
                    );
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
                        <Name style={{ marginBottom: 10, fontSize:'16px'}}>{author}</Name>
                        <Name style={{marginBottom:'30px'}}>{date?.split('T')[0]}</Name>
                    </DiaryTitle>
                    <QuestionBox>
                        <QuestionTitle>
                            <span style={{ marginRight: 5, fontSize: 16 }}>
                                Q.
                            </span>
                            <span style={{ fontSize: 16, fontWeight: 500 }}>
                                {title}
                            </span>
                        </QuestionTitle>
                        <QuestionContent>{content}</QuestionContent>
                    </QuestionBox>
                    <>
                        <InputComment
                            onKeyDown={postComment}
                            placeholder={
                                lang
                                    ? 'Enter the comments..'
                                    : '댓글을 입력하세요...'
                            }
                            value={comment}
                            onChange={onChangeComment}
                        />
                        <div
                            style={{
                                width: '90%',
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
                                    top: -31,
                                    left: -20,
                                }}
                            />
                        </div>
                    </>

                    <AnswerBox>
                        {answerData.map((answer) => (
                            <Answer key={answer.id}>
                                <Username>
                                    <span style={{fontSize:'13px'}}>{answer.author}</span>
                                    <span
                                        style={{
                                            borderBottom: '1px solid black',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => deleteComment(answer.id)}
                                    >
                                        {lang ? 'Delete' : '지우기'}
                                    </span>
                                </Username>
                                <AnswerContent>{answer.content}</AnswerContent>
                            </Answer>
                        ))}
                    </AnswerBox>

                    <div
                        style={{
                            width: '90%',
                            display: 'flex',
                            justifyContent: 'space-around',
                            marginTop: '20px',
                            padding:'10px 0'
                        }}
                    >
                        <UtilGroup onClick={modifyPost}>
                            <UtilImg src={modify} alt='modify' />
                            {/* <UtilBtn>{lang ? 'Modfiy' : '수정'}</UtilBtn> */}
                        </UtilGroup>
                        
                   
                        <Link to='/question' style={{ textDecoration: 'none' }}>
                            <Button style={{ marginTop: 20 }}>
                                {lang ? 'List' : '목록'}
                            </Button>
                        </Link>

                        <UtilGroup
                            style={{ display: 'flex', alignItems: 'center' }}
                            onClick={deletePost}
                        >
                            <UtilImg src={deleteImg} alt='delete' />
                            {/* <UtilBtn>{lang ? 'Delete' : '삭제'}</UtilBtn> */}
                        </UtilGroup>
                     </div>    
                </Contents>
            )}
        </Container>
    );
};

export default QuestionDetail;
