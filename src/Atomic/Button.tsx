import React, { ButtonHTMLAttributes, FunctionComponent, MouseEventHandler, ReactNode } from 'react';
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
  onClickHandler?: MouseEventHandler;
  disabled?: boolean;
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  dataTestid?: string;
}

const Button: FunctionComponent<IProps> = ({
  type,
  primary,
  onClickHandler,
  disabled = false,
  children,
  dataTestid,
}) => {
  return (
    <Container type={type} onClick={onClickHandler} disabled={disabled} primary={primary} data-testid={dataTestid}>
      {children}
    </Container>
  );
};

export default React.memo(Button);
