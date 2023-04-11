import { FunctionComponent } from 'react';
import { Container } from '@components/TodoContent/style';
import { Todo } from '../../dto/todo';
import TodoItem from '@components/TodoItem';

interface IProps {
  todos: Todo[];
}

const TodoContent: FunctionComponent<IProps> = ({ todos }) => {
  return (
    <Container>
      {todos &&
        todos.length > 0 &&
        todos.map((todo) => (
          <TodoItem id={todo.id} todo={todo.todo} isCompleted={todo.isCompleted} userId={todo.userId} key={todo.id} />
        ))}
      {todos.length === 0 && <span>할 일이 없습니다...</span>}
    </Container>
  );
};

export default TodoContent;
