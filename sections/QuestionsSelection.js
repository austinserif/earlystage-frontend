import React, { useState } from 'react';
import { Grid, Menu, Segment, Input, Item } from 'semantic-ui-react';

const QuestionsSelection = () => {
  const [activeItem, setActiveItem] = useState('home');
  const handleItemClick = (e, { name }) => setActiveItem(name);
  return (
    <Menu secondary>
      <Menu.Menu position="right">
        <Item position="right">
          <Input
            action={{ type: 'submit', content: 'Add Question' }}
            placeholder="How many years of industry experience does the founder have?"
          />
        </Item>
      </Menu.Menu>
    </Menu>
  );
};

export default QuestionsSelection;
