import { FunctionComponent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

interface IProps {}

enum FORM_TYPE {
  SIGN_UP = 'signup',
  SIGN_IN = 'signin',
}

const TodoList: FunctionComponent<IProps> = () => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) return <Navigate to={'/signin'} replace />;

  return (
    <div>
      <div>투두리스트</div>
      <li>
        <label>
          <input type="checkbox" />
          <span>TODO 1</span>
        </label>
      </li>
      <li>
        <label>
          <input type="checkbox" />
          <span>TODO 2</span>
        </label>
      </li>
    </div>
  );
};

export default TodoList;
