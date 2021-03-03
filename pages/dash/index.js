import { Loader, Container } from 'semantic-ui-react';
import DashboardNavbar from '../../sections/DashboardNavbar';
import WorkspaceList from '../../sections/WorkspaceList';
import DashboardHeader from '../../components/DashboardHeading';
import { useEffect } from 'react';
import {
  initialLoadingSequence,
  clearProcessingInitialLoad
} from '../../redux/cache/cacheActionCreator';
import cookieCutter from 'cookie-cutter'; // lightweight package for accessing cookies on client and server
import { useRouter } from 'next/dist/client/router';
import { connect } from 'react-redux';
import parseCookies from '../../utils/parseCookies';

const Dash = (props) => {
  const router = useRouter();
  const cookies = parseCookies('token', 'email', 'isVerified', 'logoutUser');
  const { token, email, isVerified, logoutUser } = cookies;

  useEffect(() => {
    // check if the user is authenticated

    if (!token || !email) {
      ['token', 'email', 'isVerified'].forEach((v) => {
        cookieCutter.set(v, '', { expires: new Date(0) });
      });
      router.push('/'); // send home, and flush cache
    }

    // if user is auth'd, check to see if the user is cached, if not initiate loading sequence
    if (!props.cache.metadata.hasCachedUser && !logoutUser) {
      props.dispatch(initialLoadingSequence({ email, token }));
    } else {
      props.dispatch(clearProcessingInitialLoad());
    }
  }, []);

  if (
    (!props.cache.metadata.hasCachedUser || props.cache.metadata.processingInitialLoad) &&
    !logoutUser
  ) {
    return <Loader size="massive" active />;
  }
  return (
    <>
      <Container>
        <DashboardNavbar />
      </Container>
      <Container text style={{ paddingTop: '7em' }}>
        {/* Dashboard Header contains title text and a button for creating new workspaces */}
        <DashboardHeader title="Dashboard" />

        {/* If the user had any workspaces, they will be displayed here */}
        <WorkspaceList
          cookies={cookies}
          workspaceArray={Object.values(props.user.workspaces.workspaces || [])}
        />
      </Container>
    </>
  );
};

export default connect((state) => state)(Dash);
