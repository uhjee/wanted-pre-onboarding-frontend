import styled from 'styled-components';

export const Container = styled.button<{
  color?: 'white' | 'green' | 'orange';
  disabled?: boolean;
  size?: 'small' | 'medium';
  full?: boolean;
}>`
  background: ${({ color, disabled }) => {
    if (disabled) return '#999';
    if (color === 'green') return '#168a2b';
    else if (color === 'orange') return '#e58725';
    return '#fff';
  }};

  // (disabled ? '#999' : primary ? '#168a2b' : '#fff')};
  color: ${({ color }) => {
    if (color === 'white') return '#168a2b';
    return '#fff';
  }};

  font-size: ${({ size }) => (size === 'small' ? '0.78em' : '1em')};
  margin: ${({ full }) => (full ? '' : '0 4px')};
  width: ${({ full }) => (full ? '100%' : '')};
  padding: ${({ size }) => (size === 'small' ? '0.3em 0.6em' : '0.5em 2em')};
  border: 2px solid
    ${({ color, disabled }) => {
      // (disabled ? '#999' : '#168a2b')
      if (disabled) return '#999';
      else if (color === 'orange') return '#e58725';
      return '#168a2b';
    }};
  border-radius: 3px;
  cursor: pointer;
`;
