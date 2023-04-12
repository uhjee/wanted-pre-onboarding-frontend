import { FunctionComponent, MouseEventHandler, useCallback } from 'react';
import { Container, LogoutText } from '@components/TodoHeader/style';
import { useNavigate } from 'react-router-dom';

interface IProps {}

const TodoHeader: FunctionComponent<IProps> = () => {
  const navigate = useNavigate();
  const logout: MouseEventHandler<HTMLSpanElement> = useCallback(
    (e) => {
      e.stopPropagation();
      localStorage.removeItem('accessToken');
      navigate('/signin');
    },
    [navigate],
  );

  return (
    <Container>
      <span>
        <span>Todolist</span>
        <span>.</span>
      </span>
      <LogoutText onClick={logout}>Logout</LogoutText>
    </Container>
  );
};

export default TodoHeader;
