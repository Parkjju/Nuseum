import Button from '../../atom/Button';
import Form from '../../atom/Form';
import Title from '../../atom/Title';
import Container from '../../atom/Container';
import { FormBox, BtnBox } from './styled';
import { useForm } from 'react-hook-form';
import Error from '../../atom/Error';
import axios from 'axios';
import ErrorModal from '../../atom/Modal';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';

function Register() {
    const {
        handleSubmit,
        register,
        formState: { errors },
        setError,
        clearErrors,
    } = useForm();
    const [display, setDisplay] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const lang = useSelector((state) => state.language.isKorean);
    const onValid = ({ code, password1, password2 }) => {
        if (password1 !== password2) {
            setError(
                'password1',
                {
                    message: '😭 동일한 패스워드를 입력해주세요!',
                },
                {
                    shouldFocus: true,
                }
            );
            return;
        }
        setIsLoading(true);

        axios
            .post('/api/v1/account/registration/', {
                username: code,
                password1: password1,
                password2: password2,
            })
            .then(() => {
                alert(
                    lang
                        ? 'Your registration has been completed!'
                        : '회원 가입이 완료되었습니다!'
                );
                setIsLoading(false);
                navigate('/login');
            })
            .catch((err) => {
                if (err.response.data.username) {
                    setError('AlreadyExists', {
                        message: lang
                            ? 'This account has already been signed up.'
                            : '이미 가입된 계정입니다.',
                        type: 'custom',
                    });
                    setIsLoading(false);
                    setDisplay(true);
                    return;
                } else if (err.response.data.password1) {
                    setError('AlreadyExists', {
                        message: lang
                            ? 'Your password is vulnerable to security.'
                            : '보안에 취약한 비밀번호입니다.',
                        type: 'custom',
                    });
                    setIsLoading(false);
                    setDisplay(true);
                    return;
                }

                alert(
                    lang
                        ? 'An error has occurred. Please contact the developer!'
                        : '오류가 발생했습니다. 담당자에게 문의해주세요!'
                );
            });
    };

    return (
        <Container>
            <Title
                text={
                    lang
                        ? 'SNU Nutrition Physiology and Pharmacology Laboratory'
                        : 'SNU 영양생리약리연구실'
                }
            />
            <FormBox onSubmit={handleSubmit(onValid)}>
                <Form
                    name='code'
                    placeholder={
                        lang
                            ? 'Please enter the code'
                            : '발급된 코드를 입력해주세요.'
                    }
                    type='text'
                    {...register('code', {
                        required: lang
                            ? '😭 Please enter the code provided only'
                            : '😭 발급된 코드를 입력해주세요!',
                    })}
                    error={errors.code}
                />
                {errors.code ? <Error>{errors.code.message}</Error> : null}

                <Form
                    placeholder={lang ? 'Password' : '패스워드 입력'}
                    name='password1'
                    type='password'
                    {...register('password1', {
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
                    error={errors.password1}
                />
                {errors.password1 && errors.code === undefined ? (
                    <Error>{errors.password1.message}</Error>
                ) : null}

                <Form
                    placeholder={lang ? 'Password check' : '패스워드 확인'}
                    name='password2'
                    type='password'
                    {...register('password2', {
                        required: '😭 비밀번호를 입력해주세요!',
                    })}
                />

                {display ? (
                    <ErrorModal
                        open={display}
                        closeModal={() => {
                            setDisplay(false);
                            clearErrors();
                        }}
                        message={errors.AlreadyExists.message}
                    />
                ) : null}

                <BtnBox as='div'>
                    {isLoading ? (
                        <CircularProgress sx={{ marginBottom: 5 }} />
                    ) : (
                        <Button
                            text={lang ? 'Register' : '가입하기'}
                            openModal={
                                errors.AlreadyExists
                                    ? () => setDisplay(true)
                                    : null
                            }
                        />
                    )}
                    <Link style={{ textDecoration: 'none' }} to='/login'>
                        <Button
                            text={
                                lang
                                    ? 'Already have an account?'
                                    : '이미 계정이 있으신가요?'
                            }
                        />
                    </Link>
                </BtnBox>
            </FormBox>
        </Container>
    );
}

export default Register;
