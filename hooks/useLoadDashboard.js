import { useState, useEffect } from 'react';
import { setWorkspaces, loadAndCacheAllComponents } from '../redux/user/workspaces/workspacesActionCreators';
import { useDispatch } from 'react-redux';
import mapData from '../utils/mapData';

const useLoadDashboard = ({ allWorkspaceData, cookies }) => {
  // isLoading is automatically set to true on the first render
  const [isLoading, setIsLoading] = useState(true);

  // `percent` defines the current status of the progress bar
  const [percent, setPercent] = useState(0);

  // `dispatchComplete` is initially set to false, and triggers the initial
  // data load inside our useEffect block, and is subsequently turned off
  //to allow iteration of progress bar without causing the data to be
  // dispatched again.
  const [dispatchComplete, setDispatchComplete] = useState(false);

  const dispatch = useDispatch(); // instantiates the dispatch function

  useEffect(() => {
    if (!dispatchComplete) {
      try {
        const mappedData = mapData(allWorkspaceData);

        dispatch(setWorkspaces(mappedData));

        const workspaceIds = Object.keys(mappedData);

        workspaceIds.forEach((v) => {
          console.log(`dispatching action to cache data for ... ${v}`);
          const { email, token } = cookies;
          dispatch(loadAndCacheAllComponents({ email, token }, v));
        });
      } catch (err) {
        console.error(err);
        dispatch(setWorkspaces({})); // if error thrown dispatch empty object for now
      } finally {
        setIsLoading(false);
        setDispatchComplete(true);
      }
    }
  }, []); // this will only execute once

  return [isLoading, percent];
};

export default useLoadDashboard;
