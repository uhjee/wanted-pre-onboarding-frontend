import React, { FunctionComponent, MouseEventHandler, ReactNode } from 'react';
import { Container } from './style';

interface IProps {
  primary?: boolean;
  onClickHandler?: MouseEventHandler;
  disabled?: boolean;
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  dataTestid?: string;
  size?: 'small' | 'medium';
  full?: boolean;
}

const Button: FunctionComponent<IProps> = ({
  type,
  primary,
  onClickHandler,
  disabled = false,
  children,
  dataTestid,
  size = 'medium',
  full = false,
}) => {
  return (
    <Container
      type={type}
      size={size}
      onClick={onClickHandler}
      disabled={disabled}
      primary={primary}
      data-testid={dataTestid}
      full={full}
    >
      {children}
    </Container>
  );
};

export default React.memo(Button);
