import React, { useState } from 'react';
import { Container, Menu, Icon } from 'semantic-ui-react';
import LoginModal from './LoginModal';
import styled from 'styled-components';
import SignUpModal from './SignUpModal';

const ButtonContainer = styled.div`
  margin: 5px;
`;

const Navbar = ({ inverted }) => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  return (
    <Menu inverted={inverted} fixed="top" borderless>
      <Container text>
        <Menu.Item as="a">
          <ButtonContainer>
            <Icon name="home" size="large" />
          </ButtonContainer>
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item>
            <ButtonContainer>
              <LoginModal inverted={inverted} open={loginModalOpen} setOpen={setLoginModalOpen} />
            </ButtonContainer>

            <ButtonContainer>
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
