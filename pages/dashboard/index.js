import { Button, Container, Header } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/dist/client/router';
import { clearUser } from '../../redux/auth/authActionCreators';
import { getUserData } from '../../api/user';
import DashboardMenu from '../../components/DashboardMenu';
import DashboardNavbar from '../../sections/DashboardNavbar';
import DashboardHeader from '../../components/DashboardHeading';

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  console.log(props.name);
  return (
    <>
      <Container>
        <DashboardNavbar />
      </Container>

      <Container text style={{ marginTop: '7em' }}>
        <DashboardHeader title="Dashboard" />
        <WorkspaceList />
      </Container>
    </>
  );
};

export const getStaticProps = async () => {
  try {
    const response = await getUserData();
    console.log(response);
    const { name, isVerified, workspaces, questions, metadata } = response;
    console.log(name);

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
    console.log(err);
    return {
      props: {
        autoLogOut: true
      }
    };
  }
};

export default Dashboard;
