import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const FormBox = styled.form`
  box-sizing: border-box;
  border: 2px solid #666;
  border-radius: 6px;
  width: 600px;
  height: 300px;
  padding: 18px 32px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const InputWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
`;

export const PasswordWrapper = styled(InputWrapper)`
  margin-top: 20px;
`;

export const Label = styled.label`
  color: #666;
`;

export const Input = styled.input`
  margin-top: 4px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 2px solid #40ad3d;
  font-size: 1.6em;
  width: 100%;
`;

export const InputMessage = styled.div`
  color: #666;
  position: absolute;
  margin-top: 4px;
  font-size: 0.78em;
`;

export const ButtonGroupWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

export const NavigatorSingupBox = styled.div`
  position: absolute;
  bottom: 10px;
  right: 5px;
  font-size: 0.88em;
`;

export const SignupText = styled.span`
  margin-left: 6px;
  color: #40ad3d;
  font-weight: 600;
  font-size: 1em;
  cursor: pointer;
`;
