import useSWR from 'swr';
import fetcher from '../../../utils/fetcher';
import { useSelector, useDispatch } from 'react-redux';
import mapData from '../../../utils/mapData';
import { setWorkspaces } from '../../../redux/user/workspaces/workspacesActionCreators';
import parseCookies from '../../../utils/parseCookies';

const useInitialLoad = () => {
  // retrieves status of current user cache
  const hasCachedUser = useSelector((s) => s.cache.metadata.hasCachedUser);
  const dispatch = useDispatch();
  const cookies = parseCookies('email', 'token', 'isVerified');

  if (hasCachedUser) {
    return {
      hasCachedUser
    };
  } else {
    const userDataURL = `/users/${cookies.email}?_token=${cookies.token}`;

    // get current user data including: profile information, workspaceIds
    const { data: userData, error: userError } = useSWR([userDataURL], fetcher);
    const isLoadingUser = !userData && !userError;

    // set data into redux

    // get current workspaces data for user
    const { data: workspacesData, error: workspacesError } = useSWR(
      !isLoadingUser ? [`/users/${cookies.email}/workspaces?_token=${cookies.token}`] : null,
      fetcher
    );
    const isLoadingWorkspaces = !workspacesData && !workspacesError;
    const mappedWorkspaces = mapData(workspacesData);
    dispatch(setWorkspaces(mappedWorkspaces));

    // get current components data for workspaces
    const { data: componentsData, error: componentsError } = useSWR(userData ? [`/users/${cookies.email}/workspaces/${userData.workspaces[0]}/components?_token=${cookies.token}`], fetcher);
    const isLoadingComponents = !componentsData && !componentsError;

    return {
      isLoading: isLoadingUser || isLoadingWorkspaces || isLoadingComponents,
      hasCachedUser
    };
  }
};

export default useInitialLoad;
