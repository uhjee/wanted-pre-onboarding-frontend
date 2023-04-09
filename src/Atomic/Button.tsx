import React, { FunctionComponent, MouseEventHandler, ReactNode } from 'react';
import styled from 'styled-components';

const Container = styled.button<{ primary?: boolean; disabled?: boolean }>`
  background: ${({ primary, disabled }) => (disabled ? '#999' : primary ? '#168a2b' : '#fff')};
  color: ${({ primary }) => (primary ? '#fff' : '#168a2b')};

  font-size: 1em;
  margin: 12px 4px;
  padding: 0.5em 2em;
  border: 2px solid ${({ disabled }) => (disabled ? '#999' : '#168a2b')};
  border-radius: 3px;
  cursor: pointer;
`;

interface IProps {
  primary?: boolean;
  onClickHandler: MouseEventHandler;
  disabled?: boolean;
  children: ReactNode;
}

const Button: FunctionComponent<IProps> = ({ primary, onClickHandler, disabled = false, children }) => {
  return (
    <Container onClick={onClickHandler} disabled={disabled} primary={primary}>
      {children}
    </Container>
  );
};

export default React.memo(Button);
