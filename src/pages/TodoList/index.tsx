import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { Container, TodoBox } from '@pages/TodoList/style';
import TodoFooter from '@components/TodoFooter';
import TodoContent from '@components/TodoContent';
import { Todo } from '../../dto/todo';
import TodoService from '@services/TodoService';
import TodoHeader from '@components/TodoHeader';

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

  return (
    <Container>
      <TodoBox>
        <TodoHeader />
        <TodoContent todos={todos} reload={getTodos} />
        <TodoFooter reload={getTodos} />
      </TodoBox>
    </Container>
  );
};

export default TodoList;
