import React, { FunctionComponent, MouseEventHandler, ReactNode } from 'react';
import { Container } from './style';

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
