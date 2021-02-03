import { useState } from 'react';
import Axios from 'axios';
import { SERVER_URL } from '../config';

const useSignUp = () => {
  const initial = {
    name: '',
    email: '',
    password: ''
  };

  const [values, setValues] = useState(initial);
  const [err, setErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(() => ({ ...values, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(() => true);
      // destructure target values from state
      const { email, password } = values;

      // make login request to the server
      const response = await Axios({
        method: 'post',
        url: `${SERVER_URL}/users`,
        data: {
          name,
          email,
          password
        }
      });

      console.log(response);

      // set jwt into state
    } catch (err) {
      // set the current error messsage into state and display
      setErr(() => err.response.data.message || 'There was an error');
    } finally {
      setIsLoading(() => false);
    }
  };

  const handleReset = () => {
    // only allow reload if user
    if (!isLoading) {
      setValues(() => ({ ...initial }));
      setErr(() => false);
    }
  };

  return [values, err, handleChange, handleReset, handleSubmit, isLoading];
};

export default useSignUp;
