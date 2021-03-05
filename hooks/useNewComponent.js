import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setWorkspaceComponent } from '../redux/user/workspaces/workspacesActionCreators';
import { postRequest } from '../api/component';

const useNewComponent = ({ email, token }, { workspaceId, questionId }) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    try {
      // set loading spinner on
      setIsLoading(() => true);

      // creates a resource on the server
      const response = await postRequest({ email, token }, workspaceId, questionId);

      // update client to reflect sucessfully created resource
      dispatch(setWorkspaceComponent(workspaceId, response.data._id, response.data));
    } catch (err) {
      console.log(err);
    } finally {
      // turn loading spinner off
      setIsLoading(() => false);
    }
  };

  return [isLoading, handleClick];
};

export default useNewComponent;
