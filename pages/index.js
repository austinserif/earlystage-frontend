import { Button, Icon, Header, Segment, Grid, Image } from 'semantic-ui-react';
import Navbar from '../sections/Navbar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { useSelector } from 'react-redux';
import HomepageLayout from '../sections/HomePageLayoutFiller';
import Footer from '../sections/Footer';

import notesIllustration from '../assets/img/notes.svg';
import cookieCutter from 'cookie-cutter';
import parseCookies from '../utils/parseCookies';
import EmailCapture from '../components/EmailCapture';

/**
 * Renders the unauthenticated landing page at the root
 * route. If a user's valid jwt token is detected in a
 * rehydrated piece of redux state, then automatically
 * navigate to the authenticated home page.
 */
const Home = () => {
  // instatiates router object
  const router = useRouter();

  // derives mobile status from window size
  const mobile = window.innerWidth < 600;

  // pushes user to dashboard if already logged in
  useEffect(() => {
    const cookies = parseCookies('token', 'email', 'isVerified', 'logoutUser');
    const { token, isVerified, email, logoutUser } = cookies;
    if (token && isVerified && email && !logoutUser) {
      router.push('/dash');
    } else if (logoutUser) {
      cookieCutter.set('logoutUser', '', { expires: new Date(0) });
    }
  }, []);

  // const data = useSelector((s) => s);
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
                    fontSize: mobile ? '3em' : '5em',
                    fontWeight: 'bold',
                    marginBottom: 30,
                    marginTop: mobile ? '2em' : '1.5em'
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
                {/* <Button size="massive" icon labelPosition="right" color="yellow">
                  Get Started
                  <Icon name="arrow right" />
                </Button> */}
                <EmailCapture />
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

export default Home;
