import { FormEventHandler, FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react';
import useInput from '@hooks/useInput';
import Auth from '@services/AuthService';
import Button from '@components/Button';
import { AxiosError } from 'axios';
import { ButtonGroupWrapper, Container, FormBox, NavigatorSingupBox, SignupText } from './style';
import { useLocation, useNavigate } from 'react-router-dom';
import ValidationInput from '@components/ValidationInput';

interface IProps {}

enum FORM_TYPE {
  SIGN_UP = 'signup',
  SIGN_IN = 'signin',
}

const Signin: FunctionComponent<IProps> = () => {
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

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [type, setType] = useState<FORM_TYPE>(FORM_TYPE.SIGN_IN);
  useEffect(() => {
    if (pathname) {
      setEmail('');
      setPassword('');
      setType(pathname.substring(1) as FORM_TYPE);
    }
  }, [pathname, setEmail, setPassword]);

  const formTitleText = useMemo(() => (type === FORM_TYPE.SIGN_IN ? '로그인' : '회원가입'), [type]);

  const onClickLogin: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const { status } = await Auth.signin({
          email,
          password,
        });
        if (status && status === 200) {
          console.log(status);
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
        if (status && status === 201) {
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
    [email, password, setValidEmail, setValidMessageEmail, navigate],
  );

  return (
    <Container>
      <FormBox onSubmit={type === FORM_TYPE.SIGN_IN ? onClickLogin : onClickSignup}>
        <ValidationInput
          label="email"
          type="email"
          dataTestid="email-input"
          value={email}
          onChangeHandler={onChangeEmail}
          isValid={isValidEmail}
          validMessage={validMessageEmail}
          className={'mb-5'}
        />
        <ValidationInput
          label="password"
          type="password"
          dataTestid="password-input"
          value={password}
          onChangeHandler={onChangePassword}
          isValid={isValidPassword}
          validMessage={validMessagePassword}
        />
        <ButtonGroupWrapper>
          <Button
            dataTestid={type === FORM_TYPE.SIGN_IN ? 'signin-button' : 'signup-button'}
            type="submit"
            primary
            disabled={!(isValidEmail && isValidPassword)}
          >
            {formTitleText}
          </Button>
        </ButtonGroupWrapper>
        <NavigatorSingupBox>
          {type === FORM_TYPE.SIGN_IN ? '계정이 없으신가요?' : '계정을 갖고 계신가요?'}
          <SignupText onClick={() => navigate(type === FORM_TYPE.SIGN_IN ? '/signup' : '/signin')}>
            {type === FORM_TYPE.SIGN_IN ? '회원가입' : '로그인'}
          </SignupText>
        </NavigatorSingupBox>
      </FormBox>
    </Container>
  );
};

export default Signin;
