import { FunctionComponent } from 'react';
import { Input, InputMessage, InputWrapper, Label } from './style';

interface IProps {
  label: string;
  type: string;
  dataTestid: string;
  value: string;
  onChangeHandler?: React.ChangeEventHandler<HTMLInputElement>;
  isValid: boolean;
  validMessage?: string;
  className?: string;
}

const ValidationInput: FunctionComponent<IProps> = ({
  label,
  type,
  dataTestid,
  value,
  onChangeHandler,
  isValid,
  validMessage,
  className = '',
}) => {
  return (
    <InputWrapper className={className}>
      <Label>{label}</Label>
      <Input type={type} id={type} data-testid={dataTestid} value={value} onChange={onChangeHandler} />
      {!isValid && validMessage && <InputMessage>{validMessage}</InputMessage>}
    </InputWrapper>
  );
};

export default ValidationInput;
