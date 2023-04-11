import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const TodoBox = styled.div`
  box-sizing: border-box;
  border: 2px solid #666;
  border-radius: 6px;
  width: 600px;
  height: 1000px;
  position: relative;
  display: flex;
  flex-direction: column;
  //justify-content: center;
`;

export const TodoHeader = styled.div`
  border-bottom: 2px solid #666;
  box-sizing: border-box;
  padding: 0 18px;
  flex: 0;
  flex-basis: 70px;
  font-size: 2em;
  display: flex;
  align-items: center;
`;
