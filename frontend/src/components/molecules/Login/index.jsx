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
import SNU from '../../../assets/SNU.png';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch } from 'react-redux';
import { authActions } from '../../../store/auth-slice';

// import { deferredPromptState } from '../../../recoil/deferredPrompt/deferredPrompt';

function Login() {
    const dispatch = useDispatch();
    const [token, setToken] = useState(null);
    // pwa 설치 관련 코드
    // const [deferredPrompt, setDeferredPrompt] =
    //     useRecoilState(deferredPromptState);

    // const installApp = async () => {
    //     // Show the install prompt
    //     deferredPrompt.prompt();
    //     // Wait for the user to respond to the prompt
    //     const { outcome } = await deferredPrompt.userChoice;
    //     // Optionally, send analytics event with outcome of user choice
    //     console.log(`User response to the install prompt: ${outcome}`);
    //     // We've used the prompt, and can't use it again, throw it away
    //     setDeferredPrompt(null);
    // };

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
            const response = await axios.post(
                'https://nuseum-v2.herokuapp.com/api/v1/account/login/',
                {
                    username: loginId,
                    password: loginPassword,
                }
            );
            dispatch(authActions.login(response.data.access_token));
            setIsLoading(false);
            navigate('/');
        } catch (err) {
            if (err.response.status === 401) {
                navigate('/login');
                return;
            }

            try {
                if (err.response.data.err_code === 'NOT_ACCEPTABLE') {
                    const response = await axios.post(
                        'https://nuseum-v2.herokuapp.com/api/v1/account/login/',
                        {
                            username: loginId,
                            password: loginPassword,
                        }
                    );
                    dispatch(authActions.login(response.data.access_token));
                    navigate('/');
                }
            } catch (error) {
                console.log(error);
                alert('서버 오류가 발생했습니다. 담당자에게 문의해주세요!');
                setIsLoading(false);
            }
        }
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
        </Container>
    );
}

export default Login;
