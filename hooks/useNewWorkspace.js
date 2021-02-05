import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewWorkspace } from '../redux/user/workspaces/workspacesActionCreators';

const useNewWorkspace = () => {
  const email = useSelector((s) => s.user.profile.email);
  const token = useSelector((s) => s.auth.token);

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

    // email and token packaged into a credentials object to be used to authenticate the requesting user
    const credentials = { email, token };

    // dispatch credentials, name and domain
    dispatch(createNewWorkspace(name, domain, credentials));
  };

  const handleReset = () => {
    setValues(() => initial);

    // TODO: clear any auth messages
  };

  return [values, handleChange, handleReset, handleSubmit];
};

export default useNewWorkspace;
