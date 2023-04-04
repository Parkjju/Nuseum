import Button from '../../atom/Button';
import Form from '../../atom/Form';
import Title from '../../atom/Title';
import Container from '../../atom/Container';
import { FormBox, BtnBox, Logo, LogoBox } from './styled';
import { useForm } from 'react-hook-form';
import Error from '../../atom/Error';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ErrorModal from '../../atom/Modal';
import { useEffect, useState } from 'react';
import NUSEUM from '../../../assets/NUSEUM_newiconlogo.png';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../../store/auth-slice';
import jwt_decode from 'jwt-decode';
import { FormControlLabel, Switch } from '@mui/material';
import { languageActions } from '../../../store/language-slice';

// import { deferredPromptState } from '../../../recoil/deferredPrompt/deferredPrompt';

function Login() {
    const dispatch = useDispatch();
    const lang = useSelector((state) => state.language.isKorean);

    useEffect(() => {
        window.sessionStorage.removeItem('isLoggedIn');
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors,
    } = useForm();

    const navigate = useNavigate();
    const [display, setDisplay] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onValid = async ({ loginId, loginPassword }) => {
        setIsLoading(true);

        try {
            const response = await axios.post('/api/v1/account/login/', {
                username: loginId,
                password: loginPassword,
            });

            const decodedData = jwt_decode(response.data.access_token);
            dispatch(
                authActions.login({
                    token: response.data.access_token,
                    exp: decodedData.exp,
                })
            );
            window.sessionStorage.setItem('isLoggedIn', true);

            setIsLoading(false);
            navigate('/');
        } catch (err) {
            console.log(err);
            if (
                err.response?.data?.non_field_errors?.[0] ===
                '주어진 자격 증명으로 로그인이 불가능합니다.'
            ) {
                setError('nonExists', {
                    message: lang
                        ? 'Invalid ID or password.'
                        : '아이디 또는 비밀번호가 잘못되었습니다.',
                });
                setIsLoading(false);
                setDisplay(true);
            }

            try {
                if (err.response?.data?.err_code === 'NOT_ACCEPTABLE') {
                    const response = await axios.post(
                        '/api/v1/account/login/',
                        {
                            username: loginId,
                            password: loginPassword,
                        }
                    );
                    const decodedData = jwt_decode(response.data.access_token);

                    dispatch(
                        authActions.login({
                            token: response.data.access_token,
                            exp: decodedData.exp,
                        })
                    );
                    window.sessionStorage.setItem('isLoggedIn', true);
                    navigate('/');
                }
            } catch (error) {
                console.log(error);
                alert(
                    lang
                        ? 'An error has occurred. Please contact the developer!'
                        : '오류가 발생했습니다. 담당자에게 문의해주세요!'
                );
                setIsLoading(false);
            }
        }
    };

    return (
        <Container style={{ backgroundColor: 'white' }}>
            <FormControlLabel
                control={
                    <Switch
                        onChange={() =>
                            dispatch(languageActions.changeLanguage())
                        }
                        checked={lang}
                        name={lang ? 'ENGLISH' : '한국어'}
                    />
                }
                label={lang ? 'ENGLISH' : '한국어'}
            />
            <LogoBox>
                <Logo src={NUSEUM} />
            </LogoBox>

            <Title
                text={
                    lang
                        ? 'NUSEUM'
                        : 'NUSEUM'
                }
            />
            <div
            style={{marginTop: '16px',marginBottom: '90px', width:'100%', textAlign:'center', 
            fontWeight: 'bold', whiteSpace:'pre-wrap', lineHeight:'1.5rem'}}
            >
                {lang?'Your Museum of \n Nutrient Physiology & Pharmacology' :'당신의 영양생리약리 박물관'}
            </div>
            <FormBox onSubmit={handleSubmit(onValid)}>
                <Form
                    {...register('loginId', {
                        required: lang
                            ? '😭 Please enter the code!'
                            : '😭 코드를 입력해주세요!',
                    })}
                    placeholder={lang ? 'Code' : '발급 코드'}
                    type='text'
                    error={errors.loginId}
                />
                {errors.loginId ? (
                    <Error>{errors.loginId.message}</Error>
                ) : null}
                <Form
                    {...register('loginPassword', {
                        required: lang
                            ? '😭 Please enter the password!'
                            : '😭 비밀번호를 입력해주세요!',
                        minLength: {
                            value: 8,
                            message: lang
                                ? '😭 Password must be at least 8 characters long!'
                                : '😭 비밀번호를 8자 이상 입력해주세요!',
                        },
                    })}
                    placeholder={lang ? 'Password' : '비밀번호 입력'}
                    type='password'
                    error={errors.loginPassword}
                />
                {errors.loginPassword && !errors.loginId ? (
                    <Error>{errors.loginPassword.message}</Error>
                ) : null}
                {display ? (
                    <ErrorModal
                        open={display}
                        closeModal={() => {
                            setDisplay(false);
                            clearErrors();
                        }}
                        message={errors.nonExists.message}
                    />
                ) : null}
                <BtnBox as='div'>
                    {isLoading ? (
                        <CircularProgress sx={{ marginBottom: 5 }} />
                    ) : (
                        <Button
                            openModal={
                                errors.nonExists ? () => setDisplay(true) : null
                            }
                            text={lang ? 'Sign In' : '로그인'}
                        />
                    )}

                    <Link style={{ textDecoration: 'none' }} to='/register'>
                        <Button text={lang ? 'Sign Up' : '회원가입'} />
                    </Link>
                </BtnBox>
            </FormBox>
        </Container>
    );
}

export default Login;
