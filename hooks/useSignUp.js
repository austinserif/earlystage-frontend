import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { attemptRegistration, clearAuthErrorMsg } from '../redux/auth/authActionCreators';

const useSignUp = () => {
  // set initial values as empty strings
  const initial = {
    name: '',
    email: '',
    password: ''
  };

  const dispatch = useDispatch();

  // values
  const [values, setValues] = useState(initial);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(() => ({ ...values, [name]: value }));
  };

  const handleSubmit = () => {
    const { email, password } = values;
    dispatch(attemptRegistration(name, email, password));
  };

  const handleReset = () => {
    setValues(() => initial);
    dispatch(clearAuthErrorMsg());
  };

  return [values, handleChange, handleReset, handleSubmit];
};

export default useSignUp;
