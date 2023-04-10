import { FormEventHandler, FunctionComponent, MouseEventHandler } from 'react';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import Button from '../../Atomic/Button';
import Auth from '../../services/AuthService';
import { AxiosError } from 'axios';
import {
  ButtonGroupWrapper,
  Container,
  FormBox,
  Input,
  InputMessage,
  InputWrapper,
  Label,
  NavigatorSingupBox,
  PasswordWrapper,
  SignupText,
} from './style';

interface IProps {}

const Signin: FunctionComponent<IProps> = () => {
  // local storage에 토큰이 있으면, /todo로 리다이렉트
  const validateEmail = (email: string): [boolean, string?] => {
    if (!email.includes('@')) return [false, '이메일 형식을 지켜주세요.'];
    return [true];
  };
  const validatePassword = (password: string): [boolean, string?] => {
    if (password.length < 8) return [false, '비밀번호는 8글자 이상 입력해주세요.'];
    return [true];
  };

  const [email, onChangeEmail, isValidEmail, validMessageEmail, setValidEmail, setValidMessageEmail] = useInput(
    '',
    validateEmail,
  );
  const [password, onChangePassword, isValidPassword, validMessagePassword] = useInput('', validatePassword);

  const onClickLogin: FormEventHandler<HTMLFormElement> = async (e) => {
    // alert('로그인한다?');
    e.preventDefault();
    try {
      const res = await Auth.signin({
        email,
        password,
      });
      console.log({ res });
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e?.response?.data?.message) {
          if (e.response.data.message === 'Unauthorized') {
            setValidEmail(false);
            setValidMessageEmail('이메일과 패스워드를 다시 확인해주세요.');
          } else {
            setValidEmail(false);
            setValidMessageEmail(e.response.data.message);
          }
        }
      }
    }
  };

  return (
    <Container>
      <FormBox onSubmit={onClickLogin}>
        <InputWrapper>
          <Label>email</Label>
          <Input type="email" id="email" data-testid="email-input" value={email} onChange={onChangeEmail} />
          {!isValidEmail && validMessageEmail && <InputMessage>{validMessageEmail}</InputMessage>}
        </InputWrapper>
        <PasswordWrapper>
          <Label>password</Label>
          <Input
            type="password"
            id="password"
            data-testid="password-input"
            value={password}
            onChange={onChangePassword}
          />
          {!isValidPassword && validMessagePassword && <InputMessage>{validMessagePassword}</InputMessage>}
        </PasswordWrapper>
        <ButtonGroupWrapper>
          <Button type="submit" primary disabled={!(isValidEmail && isValidPassword)}>
            로그인
          </Button>
        </ButtonGroupWrapper>
        <NavigatorSingupBox>
          계정이 없으신가요?
          <SignupText>회원가입</SignupText>
        </NavigatorSingupBox>
      </FormBox>
    </Container>
  );
};

export default Signin;
