import { useState } from 'react';
import Axios from 'axios';
import { SERVER_URL } from '../config';
import { useSelector } from 'react-redux';
import { attemptLogin } from '../redux/auth/authActionCreators';

const useLogin = () => {
  const initial = {
    email: '',
    password: ''
  };

  const token = useSelector((s) => s.auth.token);
  const isLoading = useSelector((s) => s.auth.isLoading);
  const err = useSelector((s) => s.auth.authErrorMessage);

  const [values, setValues] = useState(initial);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(() => ({ ...values, [name]: value }));
  };

  const handleSubmit = () => {
    const { email, password } = values;
    attemptLogin(email, password);
  };

  const handleReset = () => {};

  return [values, err, handleChange, handleReset, handleSubmit, isLoading];
};

export default useLogin;
