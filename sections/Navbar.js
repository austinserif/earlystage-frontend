import React, { useState } from 'react';
import { Container, Menu, Image } from 'semantic-ui-react';
import LoginModal from './LoginModal';
import styled from 'styled-components';
import SignUpModal from './SignUpModal';
import Logo from '../assets/img/logo.svg';

const ButtonContainer = styled.div`
  margin: 5px;
`;

const Navbar = ({ inverted }) => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  return (
    <Menu inverted={inverted} fixed="top" borderless>
      <Container>
        <Menu.Item as="a">
          <ButtonContainer style={{ marginLeft: '0px' }}>
            <Image size="tiny" src={Logo} />
          </ButtonContainer>
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item>
            <ButtonContainer>
              <LoginModal inverted={inverted} open={loginModalOpen} setOpen={setLoginModalOpen} />
            </ButtonContainer>

            <ButtonContainer style={{ marginRight: '0px' }}>
              <SignUpModal
                inverted={inverted}
                open={signUpModalOpen}
                setOpen={setSignUpModalOpen}
              />
            </ButtonContainer>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

export default Navbar;
