import Button from '../../atom/Button';
import Form from '../../atom/Form';
import Title from '../../atom/Title';
import Container from '../../atom/Container';
import { FormBox, BtnBox, Logo, LogoBox } from './styled';
import { useForm } from 'react-hook-form';
import Error from '../../atom/Error';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { token } from '../../../recoil/token/token';
import { Link, useNavigate } from 'react-router-dom';
import ErrorModal from '../../atom/Modal';
import { useState } from 'react';
import SNU from '../../../assets/SNU.png';

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors,
    } = useForm();
    const tokenSetter = useSetRecoilState(token);
    const navigate = useNavigate();
    const [display, setDisplay] = useState(false);

    const onValid = ({ loginId, loginPassword }) => {
        axios
            .post(
                'https://cryptic-castle-40575.herokuapp.com/api/v1/accounts/login/',
                {
                    username: loginId,
                    password: loginPassword,
                }
            )
            .then((response) => {
                tokenSetter(response.data.access_token);
                navigate('/');
            })
            .catch(() => {
                setError('nonExists', {
                    message: '아이디 또는 비밀번호가 잘못되었습니다.',
                });
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
                    <Button
                        openModal={
                            errors.nonExists ? () => setDisplay(true) : null
                        }
                        text='로그인'
                    />

                    <Link style={{ textDecoration: 'none' }} to='/register'>
                        <Button text='회원가입' />
                    </Link>
                </BtnBox>
            </FormBox>
        </Container>
    );
}

export default Login;
