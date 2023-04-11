export type Todo = {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
};

export type CreateTodoReqDto = Pick<Todo, 'todo'>;

export type CreateTodoResDto = Todo;

export type GetTodosReSDto = Todo[];

export type UpdateTodoReqDto = Pick<Todo, 'todo' | 'isCompleted'>;

export type UpdateTodoResDto = Todo;
