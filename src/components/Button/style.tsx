import styled from 'styled-components';

export const Container = styled.button<{ primary?: boolean; disabled?: boolean }>`
  background: ${({ primary, disabled }) => (disabled ? '#999' : primary ? '#168a2b' : '#fff')};
  color: ${({ primary }) => (primary ? '#fff' : '#168a2b')};

  font-size: 1em;
  margin: 12px 4px;
  padding: 0.5em 2em;
  border: 2px solid ${({ disabled }) => (disabled ? '#999' : '#168a2b')};
  border-radius: 3px;
  cursor: pointer;
`;
