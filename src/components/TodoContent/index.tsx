import { FunctionComponent, MutableRefObject, useEffect, useRef } from 'react';
import { Container } from '@components/TodoContent/style';
import { Todo } from '../../dto/todo';
import TodoItem from '@components/TodoItem';

interface IProps {
  todos: Todo[];
  reload: () => void;
  scrollContainerRef: MutableRefObject<HTMLDivElement | null>;
}

const TodoContent: FunctionComponent<IProps> = ({ todos, reload, scrollContainerRef }) => {
  const todoContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollContainerRef.current = todoContainerRef.current;
  }, [todoContainerRef, scrollContainerRef]);

  return (
    <Container ref={todoContainerRef}>
      {todos &&
        todos.length > 0 &&
        todos.map((todo) => (
          <TodoItem
            id={todo.id}
            todo={todo.todo}
            isCompleted={todo.isCompleted}
            userId={todo.userId}
            key={todo.id}
            reload={reload}
          />
        ))}
      {todos.length === 0 && <span>할 일이 없습니다...</span>}
    </Container>
  );
};

export default TodoContent;
