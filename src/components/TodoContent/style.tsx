import styled from 'styled-components';

export const Container = styled.div`
  border-bottom: 2px solid #666;
  box-sizing: border-box;
  padding: 18px;
  flex: 1;

  & > * {
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;
