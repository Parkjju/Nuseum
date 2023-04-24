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
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    InputLabel,
    NativeSelect,
    Radio,
    RadioGroup,
} from '@mui/material';

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
    const [gender, setGender] = useState('M');
    const [age, setAge] = useState(3);
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
                gender,
                age,
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
            <span
                style={{width: '85%', display: 'block',textAlign: 'justify', lineHeight: 1.4, whiteSpace:'pre-wrap', fontSize: '13px', margin: '0 auto 25px', padding: '10px', background:'#f1f1f1',borderRadius:'5px'}}
            >
                뉴지엄 product의 PoC를 진행하고 있습니다. 회원가입해서 사용해보실 수 있습니다. 
                현재는 만 3-5세를 위해 만들어져 있지만 개인이 먹고있는 식이의 다양성이나 영양성분에 대한 정보를 제공받고 필요한 식재료나 음식의 주문에 뉴지엄의 지식을 사용하실 수 있습니다. {'\n'}{'\n'}
                뉴지엄의 성장을 위해 좋았던 점, 개선해야할 점 등을 알려주세요. 주변 많은 분들께도 전달부탁드립니다-!
            </span>
            <FormBox onSubmit={handleSubmit(onValid)}>
                <FormControl sx={{ width: 300 }}>
                    <FormLabel id='demo-radio-buttons-group-label'>
                        성별
                    </FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby='demo-radio-buttons-group-label'
                        defaultValue='M'
                        name='radio-buttons-group'
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <FormControlLabel
                            value='M'
                            control={<Radio />}
                            label='남'
                        />
                        <FormControlLabel
                            value='F'
                            control={<Radio />}
                            label='여'
                        />
                    </RadioGroup>
                </FormControl>
                <FormControl sx={{ width: 300, marginY: 1.5 }}>
                    <InputLabel
                        variant='standard'
                        htmlFor='uncontrolled-native'
                    >
                        나이
                    </InputLabel>
                    <NativeSelect
                        defaultValue={3}
                        inputProps={{
                            name: '나이',
                            id: 'uncontrolled-native',
                        }}
                        onChange={(e) => setAge(e.target.value)}
                    >
                        <option value={3}>3세</option>
                        <option value={4}>4세</option>
                        <option value={5}>5세</option>
                    </NativeSelect>
                </FormControl>
                <Form
                    name='code'
                    placeholder={
                        lang ? 'Please enter the ID' : '아이디를 입력해주세요.'
                    }
                    type='text'
                    {...register('code', {
                        required: lang
                            ? '😭 Please enter the ID'
                            : '😭 아이디를 입력해주세요!',
                    })}
                    error={errors.code}
                />
                {errors.code ? <Error>{errors.code.message}</Error> : null}

                <Form
                    placeholder={lang ? 'Password' : '비밀번호 입력'}
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
                    placeholder={lang ? 'Password check' : '비밀번호 확인'}
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
