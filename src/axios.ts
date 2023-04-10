import { default as _axios } from 'axios';

const axios = _axios.create({
  baseURL: 'https://www.pre-onboarding-selection-task.shop',
  withCredentials: false,
});

/* CORS 관련 설정 */
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const CancelToken = _axios.CancelToken;
const source = CancelToken.source();

axios.interceptors.request.use(
  async function (config) {
    config.timeout = 60000;
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      if (accessToken) {
        config.headers!.Authorization = `Bearer ${accessToken}`;
        config.cancelToken = source.token;
      }
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// 응답 인터셉터
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    console.log(error);
    try {
      if (error.response.status === 401 && !error.config.url.includes('signin') && error.config.headers.Authorization) {
        source.cancel();

        // 로그인 화면으로 라우팅
        // router.push('/login');
        return error.response;
      }
    } catch (e: any) {
      console.error(`[axios.interceptors.response] response : `, e.message);
    }
    return Promise.reject(error);
  },
);

export default axios;
