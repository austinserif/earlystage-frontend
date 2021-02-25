import styled from 'styled-components';
import { Button, Icon, Header, Loader, Segment, Grid, Image } from 'semantic-ui-react';
import Navbar from '../sections/Navbar';
import { useLayoutEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { useSelector } from 'react-redux';
import HomepageLayout from '../sections/HomePageLayoutFiller';
import Footer from '../sections/Footer';

import notesIllustration from '../assets/img/notes.svg';
import axios from 'axios';
import { setUserProfile } from '../redux/user/profile/profileActionCreators';
import Cookies from 'cookie-cutter';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

/**
 * Renders the unauthenticated landing page at the root
 * route. If a user's valid jwt token is detected in a
 * rehydrated piece of redux state, then automatically
 * navigate to the authenticated home page.
 */
const Home = () => {
  const mobile = false;
  const data = useSelector((s) => s);
  console.log(data);
  return (
    <>
      <Navbar inverted={false} />
      <Segment style={{ padding: '3em 0em' }} vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={8}>
              <Grid.Row>
                <Header
                  as="h1"
                  content="Want to spend less time on due diligence?"
                  style={{
                    fontSize: mobile ? '2em' : '5em',
                    fontWeight: 'bold',
                    marginBottom: 30,
                    marginTop: mobile ? '1.5em' : '2em'
                  }}
                />
              </Grid.Row>
              <Grid.Row>
                <p style={{ fontSize: '1.50em', marginBottom: 30 }}>
                  Use modular components to compile due diligence documentation faster, and with
                  more flexibility than ever before.
                </p>
              </Grid.Row>
              <Grid.Row>
                <Button size="massive" icon labelPosition="right" color="yellow">
                  Get Started
                  <Icon name="arrow right" />
                </Button>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column floated="right" width={6}>
              <Image rounded size="large" src={notesIllustration} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <HomepageLayout />
      <Footer />
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  // destructure credential related cookies
  const { token, isVerified, email } = ctx.req.cookies;

  // if all the necessary tokens are found in cookies, redirect the requesting client to their dashboard
  if (token && isVerified && email && ctx.res) {
    ctx.res.writeHead(302, { Location: '/dash' });
    ctx.res.end();
    return { props: {} }; // return empty props object
  }

  return {
    props: {
      cookies: ctx.req.cookies
    }
  };
};

export default Home;
