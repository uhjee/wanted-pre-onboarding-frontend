import { ButtonGroupWrapper, Container, Label, Text } from '@components/TodoItem/style';
import { FunctionComponent, useState } from 'react';
import Button from '@components/Button';

interface IProps {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

const TodoItem: FunctionComponent<IProps> = ({ todo, userId, isCompleted, id }) => {
  const [checked, setChecked] = useState(() => {
    return isCompleted;
  });
  return (
    <Container>
      <Label className="mr-4">
        <input type="checkbox" checked={checked} className="mr-2" />
        <Text>{todo}</Text>
      </Label>
      <ButtonGroupWrapper>
        <Button primary size="small" dataTestid="modify-button">
          MODIFY
        </Button>
        <Button size="small" dataTestid="delete-button">
          DELETE
        </Button>
      </ButtonGroupWrapper>
    </Container>
  );
};

export default TodoItem;
