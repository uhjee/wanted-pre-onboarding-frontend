import { ButtonGroupWrapper, Container, Input, Label, Text } from '@components/TodoItem/style';
import React, {
  ChangeEventHandler,
  FunctionComponent,
  KeyboardEventHandler,
  MouseEventHandler,
  useCallback,
  useMemo,
  useState,
} from 'react';
import Button from '@components/Button';
import TodoService from '@services/TodoService';
import useInput from '@hooks/useInput';

interface IProps {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
  reload: () => void;
}
enum MODE_TYPE {
  VIEW = 'VIEW',
  EDIT = 'EDIT',
}

const TodoItem: FunctionComponent<IProps> = ({ todo, userId, isCompleted, id, reload }) => {
  const [checked, setChecked] = useState(() => {
    return isCompleted;
  });

  const updateTodo = useCallback(
    async (id: number, todo: string, isCompleted: boolean) => {
      const { status } = await TodoService.updateTodo(id, {
        todo,
        isCompleted,
      });
      if (status && status === 200) {
        reload();
      }
    },
    [reload],
  );

  const [mode, setMode] = useState<MODE_TYPE>(MODE_TYPE.VIEW);
  const { value: todoToEdit, setValue: setTodoToEdit, handler: onChangeHandlerTodoToEdit } = useInput(todo);
  const isChangedTodoToEidt = useMemo(
    () => todo.length !== todoToEdit.length || todo !== todoToEdit,
    [todo, todoToEdit],
  );
  const isEmptyTodoToEdit = useMemo(() => todoToEdit.length === 0, [todoToEdit]);

  const onChangeCheckBoxHandler: ChangeEventHandler<HTMLInputElement> = useCallback(
    ({ target }) => {
      setChecked(target.checked);
      updateTodo(id, todoToEdit, target.checked);
    },
    [id, todoToEdit, updateTodo],
  );

  const onClickModifyButton: MouseEventHandler<HTMLButtonElement> = useCallback(
    async (e) => {
      e.stopPropagation();
      setMode(MODE_TYPE.EDIT);
    },
    [setMode],
  );

  const onClickCancelButton: MouseEventHandler<HTMLButtonElement> = useCallback(
    async (e) => {
      e.stopPropagation();
      setMode(MODE_TYPE.VIEW);
      setTodoToEdit(todo);
    },
    [setMode, setTodoToEdit, todo],
  );

  const onClickDeleteButton: MouseEventHandler<HTMLButtonElement> = useCallback(
    async (e) => {
      e.stopPropagation();
      const { status } = await TodoService.deleteTodo(id);
      if (status && status === 204) {
        reload();
      }
    },
    [id, reload],
  );

  const onClickSubmitButton: MouseEventHandler<HTMLButtonElement> = useCallback(
    async (e) => {
      e.stopPropagation();
      await updateTodo(id, todoToEdit, checked);
      setMode(MODE_TYPE.VIEW);
      setTodoToEdit(todo);
    },
    [id, todoToEdit, checked, updateTodo, todo, setTodoToEdit],
  );

  const onKeyPressHandler: KeyboardEventHandler = useCallback(
    async (e) => {
      if (e.key === 'Enter' && !isEmptyTodoToEdit) {
        e.stopPropagation();
        await updateTodo(id, todoToEdit, checked);
        setMode(MODE_TYPE.VIEW);
        setTodoToEdit(todo);
      }
    },
    [id, todoToEdit, checked, updateTodo, todo, setTodoToEdit, isEmptyTodoToEdit],
  );

  return (
    <Container>
      <Label className="mr-4">
        <input type="checkbox" checked={checked} onChange={onChangeCheckBoxHandler} className="mr-2" />
        {mode === MODE_TYPE.VIEW ? (
          <Text checked={checked}>{todo}</Text>
        ) : (
          <Input
            value={todoToEdit}
            onChange={onChangeHandlerTodoToEdit}
            onKeyDown={onKeyPressHandler}
            type="text"
            data-testid="modify-input"
          />
        )}
      </Label>
      {mode === MODE_TYPE.VIEW ? (
        <ButtonGroupWrapper>
          <Button onClickHandler={onClickModifyButton} color="green" size="small" dataTestid="modify-button">
            MODIFY
          </Button>
          <Button onClickHandler={onClickDeleteButton} size="small" dataTestid="delete-button">
            DELETE
          </Button>
        </ButtonGroupWrapper>
      ) : (
        <ButtonGroupWrapper>
          <Button
            onClickHandler={onClickSubmitButton}
            disabled={!isChangedTodoToEidt || isEmptyTodoToEdit}
            color="orange"
            size="small"
            dataTestid="submit-button"
          >
            SUBMIT
          </Button>
          <Button onClickHandler={onClickCancelButton} size="small" dataTestid="cancel-button">
            CANCEL
          </Button>
        </ButtonGroupWrapper>
      )}
    </Container>
  );
};

export default React.memo(TodoItem);
