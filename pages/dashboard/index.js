import { Container, Table, Menu, Icon, Label, Button, Progress } from 'semantic-ui-react';
import { connect, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import DashboardNavbar from '../../sections/DashboardNavbar';
import DashboardHeader from '../../components/DashboardHeading';
import WorkspaceList from '../../sections/WorkspaceList';
import EmailVerification from '../../sections/EmailVerification';
import {
  getWorkspacesFromIds,
  loadAndSetWorkspace,
  setWorkspaces
} from '../../redux/user/workspaces/workspacesActionCreators';
import Promise from 'es6-promise';
import axios from 'axios';
import useSWR from 'swr';
import cookieCutter from 'cookie-cutter';
import { useRouter, Router } from 'next/dist/client/router';
import { useLayoutEffect, useState, useEffect } from 'react';
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const Dashboard = (props) => {
  console.log(props);
  const { isVerified } = props.cookies;
  const [isLoading, setIsLoading] = useState(true);
  const [percent, setPercent] = useState(0);
  const [dispatchComplete, setDispatchComplete] = useState(false);

  useEffect(() => {
    if (!dispatchComplete) {
      props.dispatch(setWorkspaces(props.userData.allWorkspaceData));
      setDispatchComplete(true);
    }

    if (isLoading) {
      const intervalId = setInterval(() => {
        if (percent < 100) {
          setPercent(percent + 1);
        } else {
          setIsLoading(false);
        }
      }, 30);

      return () => clearInterval(intervalId);
    }
  }, [percent]); // this will only execute once

  return (
    <>
      <Container>
        <DashboardNavbar />
      </Container>
      <Container text style={{ paddingTop: '7em' }}>
        {isVerified ? (
          isLoading ? (
            <Progress percent={percent} indicating style={{ marginTop: '50%' }} />
          ) : (
            <>
              {/* Dashboard Header contains title text and a button for creating new workspaces */}
              <DashboardHeader title="Dashboard" />

              {/* If the user had any workspaces, they will be displayed here */}
              <WorkspaceList workspaceArray={Object.values(props.workspaces.workspaces) || []} />
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

    // get basic user data --> {_id, account, questions, workspaces, metadata}
    const user = await axios({
      method: 'GET',
      url: `${SERVER_URL}/users/${cookies.email}?_token=${cookies.token}`
    });

    return {
      props: {
        userData: user.data,
        cookies
      }
    };
  } catch (err) {
    ctx.res.setHeader('location', '/');
    ctx.res.statusCode = 302;
    ctx.res.end();
    return { props: {} };
  }
};

export default connect((state) => state.user)(Dashboard);
