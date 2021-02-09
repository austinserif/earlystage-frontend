import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';
import DashboardNavbar from '../../sections/DashboardNavbar';
import DashboardHeader from '../../components/DashboardHeading';
import WorkspaceList from '../../sections/WorkspaceList';
import EmailVerification from '../../sections/EmailVerification';
import {
  getWorkspacesFromIds,
  loadAndSetWorkspace
} from '../../redux/user/workspaces/workspacesActionCreators';
import Promise from 'es6-promise';
import axios from 'axios';
import useSWR from 'swr';
import cookieCutter from 'cookie-cutter';
import { useRouter, Router } from 'next/dist/client/router';
import { useLayoutEffect, useState } from 'react';
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const fetcher = (urlArray) =>
  Promise.all(urlArray.map((v) => axios.get(v).then((res) => res.data)));

const Dashboard = ({ cookies, userData }) => {
  const { isVerified } = cookies;

  return (
    <>
      <Container>
        <DashboardNavbar />
      </Container>

      {isVerified ? (
        <Container text style={{ marginTop: '7em' }}>
          {/* Dashboard Header contains title text and a button for creating new workspaces */}
          <DashboardHeader title="Dashboard" />

          {/* If the user had any workspaces, they will be displayed here */}
          <WorkspaceList workspaceArray={userData.workspaces} />
        </Container>
      ) : (
        <Container text style={{ marginTop: '7em' }}>
          <EmailVerification />
        </Container>
      )}
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  try {
    const cookies = ctx.req ? ctx.req.cookies : {};

    const user = await axios({
      method: 'GET',
      url: `${SERVER_URL}/users/${cookies.email}?_token=${cookies.token}`
    });

    return {
      props: {
        userData: user.data,
        cookies: ctx.req.cookies
      }
    };
  } catch (err) {
    ctx.res.setHeader('location', '/');
    ctx.res.statusCode = 302;
    ctx.res.end();
    return { props: {} };
  }
};

export default connect((state) => state)(Dashboard);
