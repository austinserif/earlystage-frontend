import { Button, Container, Header } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/dist/client/router';
import { clearUser } from '../../redux/auth/authActionCreators';
import { getUserData } from '../../api/user';
import DashboardMenu from '../../components/DashboardMenu';
import DashboardNavbar from '../../sections/DashboardNavbar';
import DashboardHeader from '../../components/DashboardHeading';
import WorkspaceList from '../../sections/WorkspaceList';

const Dashboard = () => {
  const { workspaces } = useSelector((s) => s.user.workspaces);
  console.log(workspaces);
  return (
    <>
      <Container>
        <DashboardNavbar />
      </Container>

      <Container text style={{ marginTop: '7em' }}>
        <DashboardHeader title="Dashboard" />
        <WorkspaceList workspaceArray={Object.entries(workspaces)} />
      </Container>
    </>
  );
};


export default Dashboard;
