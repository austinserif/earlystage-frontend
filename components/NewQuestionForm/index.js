import { connect } from 'react-redux';
import {
  Segment,
  Button,
  Select,
  Input,
  Dropdown,
  Header
} from 'semantic-ui-react';
import { useState } from 'react';
import useNewQuestion from './useNewQuestion';
import styled from 'styled-components';

const DashContainer = styled.div`
  padding: 50px;
`;

const NewQuestionForm = (props) => {
  const [
    question,
    category,
    categories,
    { handleChangeInput, handleChangeSelect, handleSubmit }
  ] = useNewQuestion({ email: props.email, token: props.token });

  console.log(props);

  return (
    <DashContainer>
      <Segment.Group>
        <Segment>
          <Header>Add your own question</Header>
        </Segment>
        <Segment loading={props.isLoadingNewQuestion}>
          <Input
            error={!!props.newQuestionError}
            fluid
            placeholder="What's your question?"
            type="text"
            name="question"
            value={question}
            onChange={handleChangeInput}
          />
        </Segment>
        <Segment.Group horizontal>
          <Segment loading={props.isLoadingNewQuestion}>
            <Dropdown
              style={{ width: '100%' }}
              onChange={handleChangeSelect}
              options={categories}
              name="category"
              placeholder="Choose a question category"
              selection
              value={category}
            />
          </Segment>
          <Segment loading={props.isLoadingNewQuestion}>
            <Button
              fluid
              onClick={() => {
                console.log({ question, category });
                handleSubmit();
              }}>
              Add Question
            </Button>
          </Segment>
        </Segment.Group>
      </Segment.Group>
    </DashContainer>
  );
};

export default connect((state) => state.user.questions)(NewQuestionForm);
