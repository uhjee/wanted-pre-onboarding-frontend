import axios from '../axios';

class TodoService {
  constructor(private baseUrl: string) {}

  async signup(payload: SignupReqDto) {
    const { data: resData } = await axios.post(`${this.baseUrl}/signup`, payload);
  }
  async signin(payload: SigninReqDto) {
    const { data: resData } = await axios.post<SigninResDto>(`${this.baseUrl}/signup`, payload);
    console.log({ resData });
  }
}

export default new TodoService('auth');
