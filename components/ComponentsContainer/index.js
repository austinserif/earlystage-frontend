import { connect } from 'react-redux';
import { Segment, Button, Select, Input, Dropdown, Header, Loader } from 'semantic-ui-react';
import { useState } from 'react';
// import useNewQuestion from './useNewQuestion';
import styled from 'styled-components';
import QuestionAnswerComponent from '../QuestionAnswerComponent';

const DashContainer = styled.div`
  padding: 50px;
`;

const ComponentsContainer = (props) => {
  if (props.isLoading) {
    return <Loader />;
  }
  return (
    <DashContainer>
      <Segment.Group>
        <Segment>
          <Header>Workspace</Header>
        </Segment>
        <Segment.Group>
          {!props.isLoading ??
            props.components.map((v) => {
              return (
                <Segment key={v._id}>
                  <QuestionAnswerComponent answer={v.answer} componentKey={v._id} />
                </Segment>
              );
            })}
        </Segment.Group>
      </Segment.Group>
    </DashContainer>
  );
};

export default connect((state) => state.user.workspaces)(ComponentsContainer);
