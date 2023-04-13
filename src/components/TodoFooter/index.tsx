import { EventHandler, FunctionComponent, KeyboardEventHandler, useCallback, useMemo } from 'react';
import { Container, Input } from '@components/TodoFooter/style';
import Button from '@components/Button';
import useInput from '@hooks/useInput';
import TodoService from '@services/TodoService';
import useThrottle from '@hooks/useThrottle';

interface IProps {
  reload: (moveScrollToBottom?: boolean) => void;
}

const TodoFooter: FunctionComponent<IProps> = ({ reload }) => {
  const { value: todoText, handler: onChangeTodoText, setValue: setTodoText } = useInput('');
  const isEmptyTodoText = useMemo(() => todoText.length === 0, [todoText]);

  const addTodo: EventHandler<any> = useCallback(
    async (e) => {
      e.stopPropagation();
      const { status } = await TodoService.createTodo({ todo: todoText });
      if (status && status === 201) {
        reload(true);
        setTodoText('');
      }
    },
    [todoText, reload, setTodoText],
  );
  const [addTodoThrottle] = useThrottle(addTodo, 200);

  const onKeyPressHandler: KeyboardEventHandler = useCallback(
    (e) => {
      if (e.key === 'Enter' && !isEmptyTodoText) {
        addTodoThrottle(e);
      }
    },
    [isEmptyTodoText, addTodoThrottle],
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
