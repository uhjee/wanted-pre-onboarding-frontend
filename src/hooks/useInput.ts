import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from 'react';

type ReturnTypes<T = any> = {
  value: T;
  handler: (e: ChangeEvent<HTMLInputElement>) => void;
  setValue: Dispatch<SetStateAction<T>>;
  isValid: boolean;
  validMessage: string;
  setValid: Dispatch<SetStateAction<boolean>>;
  setValidMessage: Dispatch<SetStateAction<string>>;
  validate: (target?: T) => void;
  clear: () => void;
};

type UseInput = <T = any>(initialData: T, validateCb?: (value: T) => [boolean, string?]) => ReturnTypes<T>;

const useInput: UseInput = <T = any>(initialData: T, validateCb?: (value: T) => [boolean, string?]): ReturnTypes<T> => {
  const [value, setValue] = useState(initialData);
  const [isValid, setValid] = useState(!validateCb);
  const [validMessage, setValidMessage] = useState('');

  const validate = useCallback(
    (target?: T) => {
      if (validateCb) {
        const validateParam = target ? target : value;
        const [validResult, validResultMessage] = validateCb(validateParam);
        setValid(validResult);
        if (validResultMessage) {
          setValidMessage(validResultMessage);
        }
      }
    },
    [validateCb, value],
  );

  const handler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const nextValue = e.target.value as unknown as T;
      setValue(nextValue);
      validate(nextValue);
    },
    [validate],
  );

  const clear = useCallback(() => {
    setValue(initialData);
    setValid(!validateCb);
    setValidMessage('');
  }, [setValue, setValid, setValidMessage, initialData, validateCb]);
  return { value, handler, setValue, isValid, validMessage, setValid, setValidMessage, validate, clear };
};
export default useInput;
