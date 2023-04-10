import { FormEventHandler, FunctionComponent, MouseEventHandler, useCallback, useEffect, useState } from 'react';
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
import { redirect, useLocation, useNavigate, useRoutes } from 'react-router-dom';

interface IProps {}

const Signin: FunctionComponent<IProps> = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [type, setType] = useState('signin');
  useEffect(() => {
    if (pathname) {
      setEmail('');
      setPassword('');
      setType(pathname.substring(1));
    }
  }, [pathname]);

  // local storage에 토큰이 있으면, /todo로 리다이렉트
  const validateEmail = useCallback((email: string): [boolean, string?] => {
    if (!email.includes('@')) return [false, '이메일 형식을 지켜주세요.'];
    return [true];
  }, []);
  const validatePassword = useCallback((password: string): [boolean, string?] => {
    if (password.length < 8) return [false, '비밀번호는 8글자 이상 입력해주세요.'];
    return [true];
  }, []);

  const [email, onChangeEmail, isValidEmail, validMessageEmail, setValidEmail, setValidMessageEmail, setEmail] =
    useInput('', validateEmail);
  const [
    password,
    onChangePassword,
    isValidPassword,
    validMessagePassword,
    setValidPassword,
    setValidMessagePassword,
    setPassword,
  ] = useInput('', validatePassword);

  const onClickLogin: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const { status } = await Auth.signin({
          email,
          password,
        });
        if (status && status === 200) {
          navigate('/todo');
        }
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
    },
    [email, password, setValidEmail, setValidMessageEmail, navigate],
  );
  const onClickSignup: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const { status } = await Auth.signup({
          email,
          password,
        });
        if (status) {
          navigate('/signin');
        } else {
          setValidEmail(false);
          setValidMessageEmail('회원가입에 실패했습니다.');
        }
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
    },
    [email, password, setValidEmail, setValidMessageEmail],
  );

  const onClickSignupText = useCallback(
    (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, path: string) => {
      e.stopPropagation();
      if (path) navigate(path);
    },
    [navigate],
  );

  return (
    <Container>
      <FormBox onSubmit={type === 'signin' ? onClickLogin : onClickSignup}>
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
          {type && type === 'signin' ? (
            <Button dataTestid="signin-button" type="submit" primary disabled={!(isValidEmail && isValidPassword)}>
              로그인
            </Button>
          ) : (
            <Button dataTestid="signup-button" type="submit" primary disabled={!(isValidEmail && isValidPassword)}>
              회원가입
            </Button>
          )}
        </ButtonGroupWrapper>

        {type && type === 'signin' ? (
          <NavigatorSingupBox>
            계정이 없으신가요?
            <SignupText onClick={(e) => onClickSignupText(e, '/signup')}>회원가입</SignupText>
          </NavigatorSingupBox>
        ) : (
          <NavigatorSingupBox>
            계정을 갖고 계신가요?
            <SignupText onClick={(e) => onClickSignupText(e, '/signin')}>로그인</SignupText>
          </NavigatorSingupBox>
        )}
      </FormBox>
    </Container>
  );
};

export default Signin;
