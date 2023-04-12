import styled from 'styled-components';

export const Container = styled.div`
  border-bottom: 2px solid #666;
  box-sizing: border-box;
  padding: 0 18px;
  flex: 0;
  flex-basis: 70px;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LogoutText = styled.span`
  color: #666;
  font-size: 1.2rem;

  &:hover {
    color: #168a2b;
    font-weight: 600;
    cursor: pointer;
  }
`;
