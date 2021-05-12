import { useState } from 'react';
import { clientValidation, submitCompletedSignUp } from './apis';

const useCompleteSignUp = (id) => {
  // set the initial values
  const initialValues = {
    accountType: 'free',
    firstName: '',
    lastName: '',
    password: '',
    termsAndConditions: false
  };

  const [errors, setErrors] = useState({});

  const updateErrors = (errs) => {
    setErrors(() => ({ ...errs }));
  };

  const [success, setSuccess] = useState(false);

  const clearError = (targetName) => {
    setErrors(() => ({ ...errors, [targetName]: false }));
  };

  // create a set of set-in-state values
  const [values, setValues] = useState(initialValues);

  // define loading variable in state
  const [isLoading, setIsLoading] = useState(false);

  const clearValues = () => {
    setValues(() => initialValues);
  };

  /** handles input field change */
  const handleChange = (e, data) => {
    const { type, name } = e.target;
    clearError(name);
    if (type === 'checkbox') {
      return setValues(() => ({ ...values, [name]: data.checked }));
    }
    return setValues(() => ({ ...values, [name]: data.value }));
  };

  const handleSubmit = async () => {
    try {
      // start loading spinner
      setIsLoading(() => true);

      // validate inputs
      clientValidation({ ...values });

      // submit form to server
      await submitCompletedSignUp(id, values);

      // turn off loading if request was successful
      setIsLoading(() => false);

      // clear form
      clearValues();

      // set success page
      setSuccess(() => true);
    } catch (err) {
      if (err.details) {
        updateErrors(err.details);
      }
      setIsLoading(() => false);
    } finally {
      console.log(values);
    }
  };

  return [values, errors, isLoading, handleChange, handleSubmit, success];
};

export default useCompleteSignUp;
