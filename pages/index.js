import styled from 'styled-components';
import { Button, Icon, Header, Loader } from 'semantic-ui-react';
import Navbar from '../sections/Navbar';
import { useLayoutEffect } from 'react';
import { useRouter } from 'next/dist/client/router';
import { useSelector } from 'react-redux';
import HomepageLayout from '../sections/HomePageLayoutFiller';
import Footer from '../sections/Footer';

const StyledContainer = styled.div`
  display: flex;
  height: 500px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #1b1c1d;
  div {
    margin: 10px 0 10px 0;
  }
`;

const StyledContainerLight = styled.div`
  display: flex;
  height: 500px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  div {
    margin: 10px 0 10px 0;
  }
`;

/**
 * Renders the unauthenticated landing page at the root
 * route. If a user's valid jwt token is detected in a
 * rehydrated piece of redux state, then automatically
 * navigate to the authenticated home page.
 */
const Home = () => {
  const mobile = false;

  // get current auth state values
  const { token } = useSelector((s) => s.auth);

  // define router object
  const router = useRouter();

  useLayoutEffect(() => {
    // if a token is added to state, push the user to their dashboard
    if (token) {
      router.push('/dashboard');
    }
  }, [token]);

  if (token) {
    return <Loader />;
  }

  return (
    <>
      <Navbar inverted={true} />
      <StyledContainer>
        <Header
          inverted
          as="h2"
          content="Earlystage Due Diligence"
          style={{
            fontSize: mobile ? '2em' : '4em',
            fontWeight: 'normal',
            marginBottom: 0,
            marginTop: mobile ? '1.5em' : '3em'
          }}
        />
        <Header
          inverted
          as="h2"
          content="Do whatever you want when you want to."
          style={{
            fontSize: mobile ? '1.5em' : '1.7em',
            fontWeight: 'normal',
            marginTop: mobile ? '0.5em' : '1.5em'
          }}
        />
        <Button primary size="huge">
          Get Started
          <Icon name="right arrow" />
        </Button>
      </StyledContainer>
      <HomepageLayout />
      <Footer />
    </>
  );
};
export default Home;
