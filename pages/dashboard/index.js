import { Container } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
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
        {/* Dashboard Header contains title text and a button for creating new workspaces */}
        <DashboardHeader title="Dashboard" />

        {/* If the user had any workspaces, they will be displayed here */}
        <WorkspaceList workspaceArray={Object.entries(workspaces)} />
      </Container>
    </>
  );
};

export default Dashboard;
