import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Container, TodoBox, TodoHeader } from '@pages/TodoList/style';
import TodoFooter from '@components/TodoFooter';
import TodoContent from '@components/TodoContent';
import { Todo } from '../../dto/todo';
import TodoService from '@services/TodoService';

interface IProps {}

const TodoList: FunctionComponent<IProps> = () => {
  const [todos, setTodos] = useState<Todo[] | []>([]);

  const getTodos = useCallback(async () => {
    const { status, data } = await TodoService.getTodos();
    if (status && status === 200 && data) {
      setTodos(data);
    }
  }, [setTodos]);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) return <Navigate to={'/signin'} replace />;
  return (
    <Container>
      <TodoBox>
        <TodoHeader>
          <div>Todolist</div>
        </TodoHeader>
        <TodoContent todos={todos} reload={getTodos} />
        <TodoFooter reload={getTodos} />
      </TodoBox>
    </Container>
  );
};

export default TodoList;
