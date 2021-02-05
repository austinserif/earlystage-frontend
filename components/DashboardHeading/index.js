import React, { useState } from 'react';
import { Header, Button, Segment, Icon, Divider } from 'semantic-ui-react';
import NewWorkspaceModal from '../../sections/NewWorkspaceModal';
import styled from 'styled-components';

const ButtonContainer = styled.div`
  margin: 5px;
`;

/**
 * Renders a Header above a dividing line to seperate
 * it from the content below. As props it takes a
 * `title` string, which it displays as an h3.
 * @param {Object} props
 * @param {String} props.title title of the section to be displayed
 */
const DashboardHeader = ({ title }) => {
  const [newWorkspaceModalOpen, setNewWorkspaceModalOpen] = useState(false);
  return (
    <Segment clearing>
      <Header floated="right">
        <ButtonContainer>
          <NewWorkspaceModal open={newWorkspaceModalOpen} setOpen={setNewWorkspaceModalOpen} />
        </ButtonContainer>
      </Header>
      <Header as="h2" floated="left">
        {title}
      </Header>
      <Divider clearing />
    </Segment>
  );
};

export default DashboardHeader;
