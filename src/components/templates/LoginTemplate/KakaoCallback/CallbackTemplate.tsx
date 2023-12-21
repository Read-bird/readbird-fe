import { setAccessToken } from '@/store/reducers';
import { TAppDispatch } from '@/store/state';
import { Alert } from '@/utils';
import { TLoginResType } from '@api/types';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const CallbackTemplate = () => {
  const dispatch = useDispatch<TAppDispatch>();
  const navigate = useNavigate();
  const params = new URL(document.location.toString()).searchParams;
  const code = params.get('code');
  const grantType = 'authorization_code';
  const REACT_APP_SERVER_PATH: string | undefined = process.env.REACT_APP_SERVER_PATH;
  const REST_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
  const redirectUri: string = process.env.REACT_APP_REDIRECT_URL + '/login/auth';

  useEffect(() => {
    handleKakaoLogin();
  }, []);

  const handleKakaoLogin = async () => {
    try {
      const res = await axios.post(
        `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${REST_API_KEY}&redirect_uri=${redirectUri}&code=${code}`,
        {},
        {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
          }
        }
      );
      if (res.status === 200) {
        const { access_token } = res.data;
        const resData = await axios.post<TLoginResType>(
          `${REACT_APP_SERVER_PATH}/api/user/login`,
          {},
          {
            headers: {
              Authorization: `Bearer ${access_token}`
            }
          }
        );
        if (resData.status === 200) {
          const extractedToken = resData.headers?.authorization;
          localStorage.setItem('rb-access-token', extractedToken);
          localStorage.setItem('rb-user-info', JSON.stringify(resData.data));
          dispatch(setAccessToken(resData.data.accessToken));
          navigate('/');
        } else {
          Alert.error({
            title: 'Error',
            text: `로그인 에러가 발생했습니다.`
          });
          navigate('/login');
        }
      } else {
        Alert.error({
          title: 'Error',
          text: `카카오 로그인 에러가 발생했습니다.`
        });
        navigate('/login');
      }
    } catch (err: any) {
      Alert.error({
        title: 'Error',
        text: `로그인 에러가 발생했습니다.`
      });
      navigate('/login');
    }
  };

  return <></>;
};
