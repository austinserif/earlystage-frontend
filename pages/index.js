import styled from 'styled-components';
import { Button, Icon, Container, Header } from 'semantic-ui-react';
import Navbar from '../sections/Navbar';
import { useState } from 'react';
import LoginModal from '../sections/LoginModal';

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

const Home = () => {
  const mobile = false;
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
      <StyledContainerLight />
    </>
  );
};
export default Home;
