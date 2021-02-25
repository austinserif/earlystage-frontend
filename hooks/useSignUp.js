import { useState } from 'react';
import { useDispatch } from 'react-redux';
import cookieCutter from 'cookie-cutter';
import {
  clearAuthErrorMsg,
  setAuthErrorMsg,
  clearIsLoading,
  setIsLoading
} from '../redux/auth/authActionCreators';
import { useRouter } from 'next/dist/client/router';
import axios from 'axios';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL; // from local.env

const useSignUp = () => {
  // set initial values as empty strings
  const initial = {
    name: '',
    email: '',
    password: ''
  };

  // exposes router and dispatch apis
  const router = useRouter();
  const dispatch = useDispatch();
  // values
  const [values, setValues] = useState(initial);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(() => ({ ...values, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      // signal loading spinner
      dispatch(setIsLoading());

      // destructure values for request
      const { name, email, password } = values;

      // build and send request
      const response = await axios({
        method: 'POST',
        url: `${SERVER_URL}/users`,
        data: {
          email,
          password,
          name
        }
      });

      // destructure response data
      const { token, isVerified } = response.data;

      // set cookies
      cookieCutter.set('token', token);
      cookieCutter.set('email', email);
      cookieCutter.set('isVerified', isVerified);

      // route user to logged in state
      router.push('/dashboard'); // does this trigger `getServerSideProps` on /dashboard
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

export default useSignUp;
