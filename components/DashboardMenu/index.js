import React, { useState } from 'react';
import { Dropdown, Icon, Input, Menu } from 'semantic-ui-react';

const DashboardMenu = () => {
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <Menu vertical>
      <Menu.Item>
        <Input placeholder="Search..." />
      </Menu.Item>
      <Menu.Item>
        Early Stage Dashboard
        <Menu.Menu>
          <Menu.Item
            name="workspaces"
            active={activeItem === 'Workspaces'}
            onClick={handleItemClick}>
            Workspaces
          </Menu.Item>
          <Menu.Item name="add" active={activeItem === 'add'} onClick={handleItemClick}>
            Add
          </Menu.Item>
          <Menu.Item name="about" active={activeItem === 'about'} onClick={handleItemClick}>
            Remove
          </Menu.Item>
        </Menu.Menu>
      </Menu.Item>

      <Menu.Item name="browse" active={activeItem === 'browse'} onClick={handleItemClick}>
        <Icon name="grid layout" />
        Browse
      </Menu.Item>
      <Dropdown item text="More">
        <Dropdown.Menu>
          <Dropdown.Item icon="edit" text="Edit Profile" />
          <Dropdown.Item icon="globe" text="Choose Language" />
          <Dropdown.Item icon="settings" text="Account Settings" />
        </Dropdown.Menu>
      </Dropdown>
    </Menu>
  );
};

export default DashboardMenu;
