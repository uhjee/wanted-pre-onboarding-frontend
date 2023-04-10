import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from 'react';

type ReturnTypes<T = any> = [
  T,
  (e: ChangeEvent<HTMLInputElement>) => void,
  boolean,
  string,
  Dispatch<SetStateAction<boolean>>,
  Dispatch<SetStateAction<string>>,
  Dispatch<SetStateAction<T>>,
];

type UseInput = <T = any>(initialData: T, validateCb?: (value: T) => [boolean, string?]) => ReturnTypes<T>;

const useInput: UseInput = <T = any,>(
  initialData: T,
  validateCb?: (value: T) => [boolean, string?],
): ReturnTypes<T> => {
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
  return [value, handler, isValid, validMessage, setValid, setValidMessage, setValue];
};
export default useInput;
