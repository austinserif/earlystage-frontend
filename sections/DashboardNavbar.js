import React, { useState } from 'react';
import { Container, Menu, Icon, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { flushUserDataCache } from '../redux/auth/authActionCreators';
import { useRouter } from 'next/dist/client/router';

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
            <Icon name="home" size="large" />
          </ButtonContainer>
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item
            name="Dashboard"
            active={activeItem === 'Dashboard'}
            onClick={handleItemClick}
          />
          <Menu.Item name="Profile" active={activeItem === 'Profile'} onClick={handleItemClick} />
          <Menu.Item name="Settings" active={activeItem === 'Settings'} onClick={handleItemClick} />
          <Menu.Item>
            <ButtonContainer>
              <Button
                onClick={() => {
                  dispatch(flushUserDataCache());
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

export default DashboardNavbar;
