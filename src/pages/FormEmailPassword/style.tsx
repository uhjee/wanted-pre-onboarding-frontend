import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const FormBox = styled.form`
  box-sizing: border-box;
  border: 1px solid #666;
  border-radius: 6px;
  width: 600px;
  height: 400px;
  padding: 18px 32px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Title = styled.div<{
  color: 'green' | 'orange';
}>`
  position: absolute;
  top: 0;
  left: 0;
  height: 60px;
  width: 100%;
  background-color: ${({ color }) => (color === 'green' ? '#40ad3d' : '#e58725')};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
  color: #fff;
  font-weight: 600;
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
  font-size: 0.78rem;
`;

export const NavagationText = styled.span<{
  color: 'green' | 'orange';
}>`
  margin-left: 6px;
  color: #888;
  font-weight: 600;
  font-size: 0.96rem;
  cursor: pointer;
`;
