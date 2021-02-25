import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const useComponents = (email, token, workspaceId) => {
  const workspace = useSelector((s) => s.user.workspaces.workspaces);
  const { data, error } = useSWR(
    [`users/${email}/workspaces/${workspaceId}/components?_token=${token}`],
    fetcher
  );

  return {
    components: data,
    isLoading: !error && !data,
    isError: error
  };
};

export default useComponents;
