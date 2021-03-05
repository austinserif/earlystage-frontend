import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewWorkspace } from '../redux/user/workspaces/workspacesActionCreators';

const useNewWorkspace = (credentials, handleModal) => {
  // set initial values as empty strings
  const initial = {
    name: '',
    domain: ''
  };

  // dispatch object
  const dispatch = useDispatch();

  // values
  const [values, setValues] = useState(initial);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(() => ({ ...values, [name]: value }));
  };

  const handleSubmit = () => {
    // name and domain of new company workspace to be created
    const { name, domain } = values;

    // dispatch credentials, name and domain, and an optional callback function
    dispatch(
      createNewWorkspace(name, domain, credentials, () => {
        handleReset(); // resets form fields to initial blank state
        handleModal(() => false); // closes modal
      })
    );
  };

  const handleReset = () => {
    setValues(() => initial);

    // TODO: clear any auth messages
  };

  return [values, handleChange, handleReset, handleSubmit];
};

export default useNewWorkspace;
