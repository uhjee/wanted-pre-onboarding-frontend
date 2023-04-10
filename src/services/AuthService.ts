import axios from '../axios';

class AuthService {
  constructor(private baseUrl: string) {}

  signup = async (payload: SignupReqDto) => await axios.post(`${this.baseUrl}/signup`, payload);

  signin = async (payload: SigninReqDto) => {
    const { data: resData } = await axios.post<SigninResDto>(`${this.baseUrl}/signin`, payload);
    console.log({ resData });
    // localStorage.setItem('user', JSON.stringify(resData._data));
  };
}

export default new AuthService('auth');
