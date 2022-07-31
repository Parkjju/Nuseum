import Button from '../../atom/Button';
import Form from '../../atom/Form';
import Title from '../../atom/Title';
import Container from '../../atom/Container';
import { FormBox, BtnBox } from './styled';

function Login() {
    return (
        <Container>
            <Title text='Nuseum' />
            <FormBox>
                <Form placeholder='발급 코드' type='text' />
                <Form placeholder='비밀번호 입력' type='password' />
                <BtnBox>
                    <Button text='로그인' />
                </BtnBox>
            </FormBox>
        </Container>
    );
}

export default Login;
