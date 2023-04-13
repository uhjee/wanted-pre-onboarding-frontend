import { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react';
import { Container, TodoBox } from '@pages/TodoList/style';
import TodoFooter from '@components/TodoFooter';
import TodoContent from '@components/TodoContent';
import { Todo } from '../../dto/todo';
import TodoService from '@services/TodoService';
import TodoHeader from '@components/TodoHeader';
import { flushSync } from 'react-dom';

interface IProps {}

const TodoList: FunctionComponent<IProps> = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = useCallback(() => {
    scrollContainerRef.current?.lastElementChild?.scrollIntoView();
  }, [scrollContainerRef]);

  const [todos, setTodos] = useState<Todo[] | []>([]);

  const getTodos = useCallback(
    async (moveScrollToBottom = false) => {
      const { status, data } = await TodoService.getTodos();
      if (status && status === 200 && data) {
        flushSync(() => {
          setTodos(data);
        });
        if (moveScrollToBottom) {
          scrollToBottom();
        }
      }
    },
    [setTodos, scrollToBottom],
  );

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
    <Container>
      <TodoBox>
        <TodoHeader />
        <TodoContent scrollContainerRef={scrollContainerRef} todos={todos} reload={getTodos} />
        <TodoFooter reload={getTodos} />
      </TodoBox>
    </Container>
  );
};

export default TodoList;
