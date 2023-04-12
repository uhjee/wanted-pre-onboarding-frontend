import React, { FunctionComponent, MouseEventHandler, ReactNode } from 'react';
import { Container } from './style';

interface IProps {
  color?: 'white' | 'green' | 'orange';
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
  color = 'white',
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
      color={color}
      data-testid={dataTestid}
      full={full}
    >
      {children}
    </Container>
  );
};

export default React.memo(Button);
