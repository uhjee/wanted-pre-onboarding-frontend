import { EventHandler, FormEventHandler, FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react';
import useInput from '@hooks/useInput';
import Auth from '@services/AuthService';
import Button from '@components/Button';
import { AxiosError } from 'axios';
import { ButtonGroupWrapper, Container, FormBox, NavigatorSingupBox, NavagationText, Title } from './style';
import { useLocation, useNavigate } from 'react-router-dom';
import ValidationInput from '@components/ValidationInput';

interface IProps {}

enum FORM_TYPE {
  SIGN_UP = 'signup',
  SIGN_IN = 'signin',
}

const Signin: FunctionComponent<IProps> = () => {
  // local storage에 토큰이 있으면, /todo로 리다이렉트
  const validateHandlerEmail = useCallback((email: string): [boolean, string?] => {
    if (!email.includes('@')) return [false, '이메일 형식을 지켜주세요.'];
    return [true];
  }, []);
  const validateHandlerPassword = useCallback((password: string): [boolean, string?] => {
    if (password.length < 8) return [false, '비밀번호는 8글자 이상 입력해주세요.'];
    return [true];
  }, []);

  const {
    value: email,
    handler: onChangeEmail,
    isValid: isValidEmail,
    validMessage: validMessageEmail,
    setValid: setValidEmail,
    setValidMessage: setValidMessageEmail,
    validate: validateEmail,
    clear: clearEmail,
  } = useInput('', validateHandlerEmail);
  const {
    value: password,
    handler: onChangePassword,
    isValid: isValidPassword,
    validMessage: validMessagePassword,
    validate: validatePassword,
    clear: clearPasword,
  } = useInput('', validateHandlerPassword);

  const onChangeEmailWithValidateOthers: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      onChangeEmail(e);
      if (password) {
        validatePassword();
      }
    },
    [onChangeEmail, validatePassword, password],
  );
  const onChangePasswordWithValidateOthers: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      onChangePassword(e);
      if (email) {
        validateEmail();
      }
    },
    [onChangePassword, validateEmail, email],
  );

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [type, setType] = useState<FORM_TYPE>(FORM_TYPE.SIGN_IN);
  useEffect(() => {
    if (pathname) {
      clearEmail();
      clearPasword();
      setType(pathname.substring(1) as FORM_TYPE);
    }
  }, [pathname, clearEmail, clearPasword]);

  const formTitleText = useMemo(() => (type === FORM_TYPE.SIGN_IN ? '로그인' : '회원가입'), [type]);
  const formMainColor = useMemo(() => (type === FORM_TYPE.SIGN_IN ? 'green' : 'orange'), [type]);

  const signin: EventHandler<any> = useCallback(
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

  const signup: FormEventHandler<HTMLFormElement> = useCallback(
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

  const onSubmitForm: EventHandler<any> = useCallback(
    (e) => {
      type === FORM_TYPE.SIGN_IN ? signin(e) : signup(e);
    },
    [type, signin, signup],
  );

  // const onKeyPressHandler: KeyboardEventHandler = useCallback(
  //   (e) => {
  //     if (e.key === 'Enter') {
  //       onSubmitForm(e);
  //     }
  //   },
  //   [onSubmitForm],
  // );

  return (
    <Container>
      <FormBox onSubmit={onSubmitForm}>
        <Title color={formMainColor}>{formTitleText}</Title>
        <ValidationInput
          label="email"
          type="email"
          dataTestid="email-input"
          value={email}
          onChangeHandler={onChangeEmailWithValidateOthers}
          isValid={isValidEmail}
          validMessage={validMessageEmail}
          className={'mb-5'}
        />
        <ValidationInput
          label="password"
          type="password"
          dataTestid="password-input"
          value={password}
          onChangeHandler={onChangePasswordWithValidateOthers}
          isValid={isValidPassword}
          validMessage={validMessagePassword}
        />
        <ButtonGroupWrapper>
          <Button
            dataTestid={type === FORM_TYPE.SIGN_IN ? 'signin-button' : 'signup-button'}
            type="submit"
            color={formMainColor}
            full
            disabled={!(isValidEmail && isValidPassword)}
          >
            {formTitleText}
          </Button>
        </ButtonGroupWrapper>
        <NavigatorSingupBox>
          {type === FORM_TYPE.SIGN_IN ? '계정이 없으신가요?' : '계정을 갖고 계신가요?'}
          <NavagationText
            color={type === FORM_TYPE.SIGN_IN ? 'orange' : 'green'}
            onClick={() => navigate(type === FORM_TYPE.SIGN_IN ? '/signup' : '/signin')}
          >
            {type === FORM_TYPE.SIGN_IN ? '회원가입' : '로그인'}
          </NavagationText>
        </NavigatorSingupBox>
      </FormBox>
    </Container>
  );
};

export default Signin;
