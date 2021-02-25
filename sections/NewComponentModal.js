import React from 'react';
import { Modal, Button, Input, Form, Message, Icon } from 'semantic-ui-react';
import useNewWorkspace from '../hooks/useNewWorkspace';
import { useSelector } from 'react-redux';
import cookieCutter from 'cookie-cutter';
import QuestionSelection from '../components/QuestionSelection';

const NewComponentModal = ({ open, setOpen }) => {
  const token = cookieCutter.get('token');
  const email = cookieCutter.get('email');
  console.log(token, email);
  const { isLoading, newWorkspaceErrMsg } = useSelector((s) => s.user.workspaces);
  const [values, handleChange, handleReset, handleSubmit] = useNewWorkspace({ email, token });
  return (
    <Modal
      closeOnEscape={false}
      closeOnDimmerClick={true}
      size="large"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button animated color="green">
          <Button.Content visible>New Component</Button.Content>
          <Button.Content hidden>
            <Icon name="add" />
          </Button.Content>
        </Button>
      }>
      <QuestionSelection />
    </Modal>
  );
};

export default NewComponentModal;
