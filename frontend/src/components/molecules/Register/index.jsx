import Button from '../../atom/Button';
import Form from '../../atom/Form';
import Title from '../../atom/Title';
import Container from '../../atom/Container';
import { FormBox, BtnBox } from './styled';
import { useForm } from 'react-hook-form';
import Error from '../../atom/Error';

function Register() {
    const {
        handleSubmit,
        register,
        formState: { errors },
        setError,
    } = useForm();
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
        }
    };

    return (
        <Container>
            <Title text='Nuseum' />
            <FormBox onSubmit={handleSubmit(onValid)}>
                <Form
                    name='code'
                    placeholder='발급된 코드를 입력해주세요.'
                    type='text'
                    {...register('code', {
                        required: '😭 아이디를 입력해주세요!',
                    })}
                    error={errors.code}
                />
                {errors.code ? <Error>{errors.code.message}</Error> : null}

                <Form
                    placeholder='패스워드 입력'
                    name='password1'
                    type='password'
                    {...register('password1', {
                        required: '😭 비밀번호를 입력해주세요!',
                    })}
                    error={errors.password1}
                />
                {errors.password1 && errors.code === undefined ? (
                    <Error>{errors.password1.message}</Error>
                ) : null}

                <Form
                    placeholder='패스워드 확인'
                    name='password2'
                    type='password'
                    {...register('password2', {
                        required: '😭 비밀번호를 입력해주세요!',
                    })}
                />

                <BtnBox as='div'>
                    <Button text='가입하기' />
                    <Button text='이미 계정이 있으신가요?' />
                </BtnBox>
            </FormBox>
        </Container>
    );
}

export default Register;
