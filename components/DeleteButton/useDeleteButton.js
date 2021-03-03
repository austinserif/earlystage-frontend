import { useState } from 'react';
import { useDispatch } from 'react-redux';

/**
 * @param {Function} serverCallback 
 * @param {any[]} serverArgs 
 * @param {Function} clientCallback 
 * @param {any[]} clientArgs 
 */
const useDeleteButton = (serverCallback, serverArgs, clientCallback, clientArgs) => {
  // indicates whether or not the first delete button has been selected
  const [selected, setSelected] = useState(false);

  const dispatch = useDispatch();

  // indicates whether or not a request is being processed or not
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Dispatches `clientCallback` (assumed to be a redux action creator)
   * and passes in `clientArgs`. Function is intended handle dispatch
   * of action creator that removes the sucessfully deleted resource
   * from the client.
   */
  const dispatchCleanUp = () => {
    dispatch(clientCallback(...clientArgs));
  };

  /**
   * Handles selection of first delete button
   */
  const handleSelect = () => {
    setSelected(() => true);
  };

  /**
   * Handles selection of delete-confirmation
   * button, triggering execution of the callback
   * function. If the callback is successful, it will
   * dispatch the action creator and its args as well.
   */
  const handleDelete = async () => {
    // only allow deletion to be handled if the first delete button has been selected
    if (selected) {
      setIsLoading(() => true);
      try {
        await serverCallback(...serverArgs);
        dispatchCleanUp();
      } catch (err) {
        console.log(err);
        setIsLoading(() => false);
      }
    }
  };

  /**
   * sets `selected` back to false,
   * removing the option for a user
   * to confirm deletion.
   */
  const handleCancel = () => {
    if (selected) {
      setSelected(() => false);
    }
  };

  return [selected, isLoading, { handleDelete, handleSelect, handleCancel }];
};

export default useDeleteButton;
