import React from 'react';
import {
  Modal,
  Button,
  Input,
  Form,
  Message,
  Icon,
  Segment,
  Dropdown,
  Header
} from 'semantic-ui-react';
import useNewWorkspace from '../hooks/useNewWorkspace';
import { useSelector, connect } from 'react-redux';
import parseCookies from '../utils/parseCookies';
import useNewQuestion from '../components/NewQuestionForm/useNewQuestion';

const NewQuestionModal = (props) => {
  const cookies = parseCookies('token', 'email');
  const { token, email } = cookies;
  const [
    question,
    category,
    categories,
    { handleChangeInput, handleChangeSelect, handleSubmit, handleReset }
  ] = useNewQuestion({ email, token });
  return (
    <Modal
      closeOnEscape={false}
      closeOnDimmerClick={false}
      size="tiny"
      onClose={() => props.setOpen(false)}
      onOpen={() => props.setOpen(true)}
      open={props.open}
      trigger={
        <Button animated color="blue">
          <Button.Content visible>New Question</Button.Content>
          <Button.Content hidden>
            <Icon name="add" />
          </Button.Content>
        </Button>
      }>
      <Modal.Header>Add Your Own Custom Question</Modal.Header>
      <Modal.Content>
        <Form loading={props.isLoadingNewQuestion}>
          <Form.Input
            error={!!props.newQuestionError}
            fluid
            placeholder="What's your question?"
            type="text"
            name="question"
            value={question}
            onChange={handleChangeInput}
          />
          <Form.Dropdown
            style={{ width: '100%' }}
            onChange={handleChangeSelect}
            options={categories}
            name="category"
            placeholder="Choose a question category"
            selection
            value={category}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          disabled={props.isLoadingNewQuestion}
          content="Cancel"
          onClick={() => {
            handleReset();
            props.setOpen(false);
          }}
        />
        <Button
          color="blue"
          onClick={() => {
            console.log({ question, category });
            handleSubmit();
          }}>
          Add Question
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default connect((state) => state.user.questions)(NewQuestionModal);
