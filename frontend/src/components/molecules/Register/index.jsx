import Button from '../../atom/Button';
import Form from '../../atom/Form';
import Title from '../../atom/Title';
import Container from '../../atom/Container';
import { FormBox, BtnBox } from './styled';

function Register() {
  return (
    <Container>
      <Title text='Nuseum' />
      <FormBox>
        <Form placeholder='발급된 코드를 입력해주세요.' type='text' />
        <Form placeholder='패스워드 입력' type='password' />
        <Form placeholder='패스워드 확인' type='password' />
      </FormBox>
      <BtnBox>
        <Button text='가입하기' />
        <Button text='이미 계정이 있으신가요?' />
      </BtnBox>
    </Container>
  );
}

export default Register;
