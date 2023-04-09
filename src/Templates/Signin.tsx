import { FunctionComponent, MouseEventHandler } from 'react';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import Button from '../Atomic/Button';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const FormBox = styled.form`
  box-sizing: border-box;
  border: 2px solid #666;
  border-radius: 6px;
  width: 600px;
  height: 300px;
  padding: 12px 8px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const InputWrapper = styled.div`
  box-sizing: border-box;
`;

const PasswordWrapper = styled(InputWrapper)`
  margin-top: 20px;
`;

const Input = styled.input`
  box-sizing: border-box;
  border-radius: 4px;
  border: 2px solid #40ad3d;
  font-size: 1.6em;
  width: 100%;
`;

const InputMessage = styled.div`
  color: #666;
  position: absolute;
  margin-top: 4px;
`;

const ButtonGroupWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

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

  const [email, onChangeEmail, isValidEmail, validMessageEmail] = useInput('', validateEmail);
  const [password, onChangePassword, isValidPassword, validMessagePassword] = useInput('', validatePassword);

  const onClickLogin: MouseEventHandler<HTMLButtonElement> = (e) => {
    alert('로그인한다?');
  };

  return (
    <Container>
      <FormBox>
        <InputWrapper>
          <label>email</label>
          <Input type="email" id="email" data-testid="email-input" value={email} onChange={onChangeEmail} />
          {!isValidEmail && <InputMessage>{validMessageEmail}</InputMessage>}
        </InputWrapper>
        <PasswordWrapper>
          <label>password</label>
          <Input
            type="password"
            id="password"
            data-testid="password-input"
            value={password}
            onChange={onChangePassword}
          />
          {!isValidPassword && <InputMessage>{validMessagePassword}</InputMessage>}
        </PasswordWrapper>
        <ButtonGroupWrapper>
          <Button primary onClickHandler={onClickLogin} disabled={!(isValidEmail && isValidPassword)}>
            로그인
          </Button>
          <Button onClickHandler={onClickLogin}>회원가입</Button>
        </ButtonGroupWrapper>
      </FormBox>
    </Container>
  );
};

export default Signin;
