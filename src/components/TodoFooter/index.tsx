import { EventHandler, FunctionComponent, KeyboardEventHandler, useCallback, useMemo } from 'react';
import { Container, Input } from '@components/TodoFooter/style';
import Button from '@components/Button';
import useInput from '@hooks/useInput';
import TodoService from '@services/TodoService';

interface IProps {
  reload: () => void;
}

const TodoFooter: FunctionComponent<IProps> = ({ reload }) => {
  const { value: todoText, handler: onChangeTodoText, setValue: setTodoText } = useInput('');
  const isEmptyTodoText = useMemo(() => todoText.length === 0, [todoText]);

  const addTodo: EventHandler<any> = useCallback(
    async (e) => {
      e.stopPropagation();
      const { status } = await TodoService.createTodo({ todo: todoText });
      if (status && status === 201) {
        reload();
        setTodoText('');
      }
    },
    [todoText, reload, setTodoText],
  );

  const onKeyPressHandler: KeyboardEventHandler = useCallback(
    (e) => {
      if (e.key === 'Enter' && !isEmptyTodoText) {
        addTodo(e);
      }
    },
    [addTodo, isEmptyTodoText],
  );

  return (
    <Container>
      <Input
        type="text"
        value={todoText}
        onChange={onChangeTodoText}
        onKeyDown={onKeyPressHandler}
        data-testid="new-todo-input"
      />
      <Button onClickHandler={addTodo} color="green" disabled={isEmptyTodoText} dataTestid="new-todo-add-button">
        ADD
      </Button>
    </Container>
  );
};

export default TodoFooter;
