import React, { useState } from 'react';
import { Container, Menu, Button, Image } from 'semantic-ui-react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { logoutAndClearCache } from '../redux/auth/authActionCreators';
import { useRouter } from 'next/dist/client/router';
import cookieCutter from 'cookie-cutter';
import logo from '../assets/img/logo.svg';

const ButtonContainer = styled.div`
  margin: 5px;
`;

const DashboardNavbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [activeItem, setActiveItem] = useState('Dashboard');

  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <Menu fixed="top" borderless>
      <Container text>
        <Menu.Item as="a" onClick={() => setActiveItem('Dashboard')}>
          <ButtonContainer>
            <Image alt="" src={logo} />
          </ButtonContainer>
        </Menu.Item>

        <Menu.Menu position="right">
          {/* <Menu.Item
            name="Dashboard"
            active={activeItem === 'Dashboard'}
            onClick={handleItemClick}
          />
          <Menu.Item name="Profile" active={activeItem === 'Profile'} onClick={handleItemClick} />
          <Menu.Item name="Settings" active={activeItem === 'Settings'} onClick={handleItemClick} /> */}
          <Menu.Item>
            <ButtonContainer>
              <Button
                onClick={() => {
                  cookieCutter.set('token', '', { expires: new Date(0) });
                  cookieCutter.set('email', '', { expires: new Date(0) });
                  cookieCutter.set('isVerified', '', { expires: new Date(0) });
                  cookieCutter.set('logoutUser', 'true');
                  dispatch(logoutAndClearCache());
                  router.push('/');
                }}>
                Log out
              </Button>
            </ButtonContainer>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

export default React.memo(DashboardNavbar);
