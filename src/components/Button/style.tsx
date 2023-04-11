import styled from 'styled-components';

export const Container = styled.button<{
  primary?: boolean;
  disabled?: boolean;
  size?: 'small' | 'medium';
  full?: boolean;
}>`
  background: ${({ primary, disabled }) => (disabled ? '#999' : primary ? '#168a2b' : '#fff')};
  color: ${({ primary }) => (primary ? '#fff' : '#168a2b')};

  font-size: ${({ size }) => (size === 'small' ? '0.78em' : '1em')};
  margin: ${({ full }) => (full ? '' : '0 4px')};
  width: ${({ full }) => (full ? '100%' : '')};
  padding: ${({ size }) => (size === 'small' ? '0.3em 0.6em' : '0.5em 2em')};
  border: 2px solid ${({ disabled }) => (disabled ? '#999' : '#168a2b')};
  border-radius: 3px;
  cursor: pointer;
`;
