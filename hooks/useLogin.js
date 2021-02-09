import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  setIsLoading,
  clearIsLoading,
  clearAuthErrorMsg,
  setAuthErrorMsg
} from '../redux/auth/authActionCreators';
import { useRouter } from 'next/dist/client/router';
import axios from 'axios';
import cookieCutter from 'cookie-cutter';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const useLogin = () => {
  // set initial values as empty strings
  const initial = {
    email: '',
    password: ''
  };

  const dispatch = useDispatch();
  const router = useRouter();

  // values
  const [values, setValues] = useState(initial);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(() => ({ ...values, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      dispatch(setIsLoading());

      const { email, password } = values;
      console.log(email, password);

      const response = await axios({
        method: 'POST',
        url: `${SERVER_URL}/login`,
        data: {
          email,
          password
        }
      });

      console.log(response.data);

      const { token, isVerified } = response.data;

      cookieCutter.set('token', token);
      cookieCutter.set('email', email);
      cookieCutter.set('isVerified', isVerified);
      router.push('/dashboard');
    } catch (err) {
      dispatch(setAuthErrorMsg());
    } finally {
      dispatch(clearIsLoading());
    }
  };

  const handleReset = () => {
    setValues(() => initial);
    dispatch(clearAuthErrorMsg());
  };

  return [values, handleChange, handleReset, handleSubmit];
};

export default useLogin;
