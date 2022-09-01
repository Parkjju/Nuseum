import Button from '../../atom/Button';
import Form from '../../atom/Form';
import Title from '../../atom/Title';
import Container from '../../atom/Container';
import { FormBox, BtnBox, Logo, LogoBox } from './styled';
import { useForm } from 'react-hook-form';
import Error from '../../atom/Error';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { token } from '../../../recoil/token/token';
import { Link, useNavigate } from 'react-router-dom';
import ErrorModal from '../../atom/Modal';
import { useState } from 'react';
import SNU from '../../../assets/SNU.png';
import CircularProgress from '@mui/material/CircularProgress';

function Login() {
    let deferredPrompt;
    const installApp = async () => {
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        // Optionally, send analytics event with outcome of user choice
        console.log(`User response to the install prompt: ${outcome}`);
        // We've used the prompt, and can't use it again, throw it away
        deferredPrompt = null;
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors,
    } = useForm();
    const [tokenValue, tokenSetter] = useRecoilState(token);
    const navigate = useNavigate();
    const [display, setDisplay] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onValid = ({ loginId, loginPassword }) => {
        setIsLoading(true);
        axios
            .post(
                'https://cryptic-castle-40575.herokuapp.com/api/v1/account/login/',
                {
                    username: loginId,
                    password: loginPassword,
                }
            )
            .then((response) => {
                console.log('로그인 리스펀스', response);
                const sessionStorage = window.sessionStorage;
                const val = sessionStorage.getItem('access_token');

                val
                    ? sessionStorage.removeItem('access_token')
                    : tokenSetter(response.data.access_token);

                sessionStorage.setItem(
                    'access_token',
                    response.data.access_token
                );
                setIsLoading(false);

                navigate('/');
            })
            .catch(() => {
                setError('nonExists', {
                    message: '아이디 또는 비밀번호가 잘못되었습니다.',
                });
                setIsLoading(false);
                setDisplay(true);
            });
    };

    return (
        <Container style={{ backgroundColor: 'white' }}>
            <LogoBox>
                <Logo src={SNU} />
            </LogoBox>

            <Title text='맞춤형 영양관리 및 정보제공 연구' />
            <FormBox onSubmit={handleSubmit(onValid)}>
                <Form
                    {...register('loginId', {
                        required: '😭 코드를 입력해주세요!',
                    })}
                    placeholder='발급 코드'
                    type='text'
                    error={errors.loginId}
                />
                {errors.loginId ? (
                    <Error>{errors.loginId.message}</Error>
                ) : null}
                <Form
                    {...register('loginPassword', {
                        required: '😭 비밀번호를 입력해주세요!',
                        minLength: {
                            value: 8,
                            message: '😭 비밀번호를 8자 이상 입력해주세요!',
                        },
                    })}
                    placeholder='비밀번호 입력'
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
                            text='로그인'
                        />
                    )}

                    <Link style={{ textDecoration: 'none' }} to='/register'>
                        <Button text='회원가입' />
                    </Link>
                </BtnBox>
            </FormBox>
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: 30,
                }}
            >
                <button onClick={installApp}>앱 설치</button>
            </div>
        </Container>
    );
}

export default Login;
