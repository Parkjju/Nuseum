import Button from '../../atom/Button';
import Form from '../../atom/Form';
import Title from '../../atom/Title';
import Container from '../../atom/Container';
import { FormBox, BtnBox } from './styled';

function Login() {
  return (
    <Container>
      <Title text='Login' />
      <FormBox>
        <Form placeholder='username' type='text' />
        <Form placeholder='password' type='password' />
      </FormBox>
      <BtnBox>
        <Button text='LOGIN' />
      </BtnBox>
    </Container>
  );
}

export default Login;
