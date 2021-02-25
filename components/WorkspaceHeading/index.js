import React, { useState } from 'react';
import { Header, Button, Segment, Icon, Divider, SegmentInline } from 'semantic-ui-react';
import NewComponentModal from '../../sections/NewComponentModal';
import styled from 'styled-components';
import NewQuestionModal from '../../sections/NewQuestionModal';

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
const WorkspaceHeader = ({ title }) => {
  const [newComponentModalOpen, setNewComponentModalOpen] = useState(false);
  const [newQuestionModalOpen, setNewQuestionModalOpen] = useState(false);
  return (
    <>
      <Header floated="right">
        <ButtonContainer>
          <NewComponentModal open={newComponentModalOpen} setOpen={setNewComponentModalOpen} />
          <NewQuestionModal open={newQuestionModalOpen} setOpen={setNewQuestionModalOpen} />
        </ButtonContainer>
      </Header>
      <Header as="h1" floated="left">
        {title}
      </Header>
      <Divider clearing />
    </>
  );
};

export default WorkspaceHeader;
