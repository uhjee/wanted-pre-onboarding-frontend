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
