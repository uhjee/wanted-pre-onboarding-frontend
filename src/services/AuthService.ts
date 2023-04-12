import axios, { contentTypeHeader } from '../axios';

class AuthService {
  constructor(private baseUrl: string) {}

  signup = async (payload: SignupReqDto) => await axios.post(`${this.baseUrl}/signup`, payload, contentTypeHeader);

  signin = async (payload: SigninReqDto) => {
    const response = await axios.post<SigninResDto>(`${this.baseUrl}/signin`, payload, contentTypeHeader);
    if (response.data.access_token) {
      localStorage.setItem('accessToken', response.data.access_token);
    }
    return response;
  };
}

export default new AuthService('auth');
