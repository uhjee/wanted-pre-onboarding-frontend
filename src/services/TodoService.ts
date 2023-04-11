import axios, { contentTypeHeader } from '../axios';
import { CreateTodoReqDto, CreateTodoResDto, GetTodosReSDto, UpdateTodoReqDto, UpdateTodoResDto } from '../dto/todo';

class TodoService {
  constructor(private baseUrl: string) {}

  createTodo = async (payload: CreateTodoReqDto) =>
    await axios.post<CreateTodoResDto>(`${this.baseUrl}`, payload, contentTypeHeader);

  getTodos = async () => await axios.get<GetTodosReSDto>(`${this.baseUrl}`);

  updateTodo = async (id: number, payload: UpdateTodoReqDto) =>
    await axios.put<UpdateTodoResDto>(`${this.baseUrl}/${id}`, payload);

  deleteTodo = async (id: number) => await axios.delete(`${this.baseUrl}/${id}`);
}

export default new TodoService('todos');
