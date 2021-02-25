import { Container, Progress, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import DashboardNavbar from '../../sections/DashboardNavbar';
import DashboardHeader from '../../components/DashboardHeading';
import WorkspaceList from '../../sections/WorkspaceList';
import EmailVerification from '../../sections/EmailVerification';
import axios from 'axios';
import { useEffect } from 'react';
import useLoadDashboard from '../../hooks/useLoadDashboard';
import { loadAndCacheQuestions } from '../../redux/user/questions/questionsActionCreators';
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const Dashboard = (props) => {
  // handles transfer of data loaded during SSR in `getServerSiderProps` and passed to component through
  //props object
  console.log(props);
  useEffect(() => {
    props.dispatch(
      loadAndCacheQuestions({
        email: props.cookies.email,
        token: props.cookies.token
      })
    );
  }, []);

  const [isLoading, percent] = useLoadDashboard({
    cookies: { ...props.cookies },
    allWorkspaceData: props.userData.allWorkspaceData
  });

  // status of whether a user is verified or not
  const { isVerified } = props.cookies;

  return (
    <>
      <Container>
        <DashboardNavbar />
      </Container>
      <Container text style={{ paddingTop: '7em' }}>
        {isVerified ? (
          isLoading ? (
            <div>
              <Loader />
            </div>
          ) : (
            <>
              {/* Dashboard Header contains title text and a button for creating new workspaces */}
              <DashboardHeader title="Dashboard" />

              {/* If the user had any workspaces, they will be displayed here */}
              <WorkspaceList workspaceArray={Object.values(props.workspaces.workspaces || [])} />
            </>
          )
        ) : (
          <EmailVerification />
        )}
      </Container>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  try {
    // get cookies object
    const { cookies } = ctx.req;
    if ('email' in cookies && 'token' in cookies && 'isVerified' in cookies) {
      return {
        props: {
          cookies
        }
      };
    } else {
      throw new Error('redirect');
    }

    // get basic user data --> {_id, account, questions, workspaces, metadata}
    // const user = await axios({
    //   method: 'GET',
    //   url: `${SERVER_URL}/users/${cookies. email}?_token=${cookies.token}`
    // });

    // return {
    //   props: {
    //     userData: user.data,
    //     cookies
    //   }
    // };
  } catch (err) {
    ctx.res.setHeader('location', '/');
    ctx.res.statusCode = 302;
    ctx.res.end();
    return { props: {} };
  }
};

export default connect((state) => state.user)(Dashboard);
