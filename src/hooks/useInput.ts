import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from 'react';

type ReturnTypes<T = any> = {
  value: T;
  handler: (e: ChangeEvent<HTMLInputElement>) => void;
  setValue: Dispatch<SetStateAction<T>>;
  isValid: boolean;
  validMessage: string;
  setValid: Dispatch<SetStateAction<boolean>>;
  setValidMessage: Dispatch<SetStateAction<string>>;
};

type UseInput = <T = any>(initialData: T, validateCb?: (value: T) => [boolean, string?]) => ReturnTypes<T>;

const useInput: UseInput = <T = any>(initialData: T, validateCb?: (value: T) => [boolean, string?]): ReturnTypes<T> => {
  const [value, setValue] = useState(initialData);
  const [isValid, setValid] = useState(!validateCb);
  const [validMessage, setValidMessage] = useState('');
  const handler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.value as unknown as T;
    setValue(nextValue);
    if (validateCb) {
      const [validResult, validResultMessage] = validateCb(nextValue);
      setValid(validResult);
      if (validResultMessage) {
        setValidMessage(validResultMessage);
      }
    }
  }, []);
  return { value, handler, setValue, isValid, validMessage, setValid, setValidMessage };
};
export default useInput;
