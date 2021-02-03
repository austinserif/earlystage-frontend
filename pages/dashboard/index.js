import { Button } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/dist/client/router';
import { clearUser } from '../../redux/auth/authActionCreators';
import { getUserData } from '../../api/user';
import DashboardMenu from '../../components/DashboardMenu';

const Dashboard = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <>
      <DashboardMenu />
      <Button
        onClick={() => {
          dispatch(clearUser());
          router.push('/');
        }}>
        Log out
      </Button>
    </>
  );
};

export const getStaticProps = async () => {
  try {
    const response = await getUserData();
    const { name, isVerified, workspaces, questions, metadata } = response;

    return {
      props: {
        name,
        isVerified,
        workspaces,
        questions,
        metadata
      }
    };
  } catch (err) {
    // an error has occured
    return {
      props: {
        autoLogOut: true
      }
    };
  }
};

export default Dashboard;
