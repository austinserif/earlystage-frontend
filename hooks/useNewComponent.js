import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setWorkspaceComponent } from '../redux/user/workspaces/workspacesActionCreators';

const useNewComponent = ({ email, token }, { workspaceId, questionId }) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    try {
      // set loading spinner on
      setIsLoading(() => true);

      // make request to server
      const response = await axios({
        method: 'POST',
        baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
        url: `/users/${email}/workspaces/${workspaceId}/components?_token=${token}`,
        data: {
          answer: '',
          questionId
        }
      });

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
