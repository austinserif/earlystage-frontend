import React from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react';
import cookieCutter from 'cookie-cutter';
import QuestionSelection from '../components/QuestionSelection';

const NewComponentModal = ({ open, setOpen, workspaceId }) => {
  const token = cookieCutter.get('token');
  const email = cookieCutter.get('email');
  console.log(token, email);
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
      <QuestionSelection workspaceId={workspaceId} />
    </Modal>
  );
};

export default NewComponentModal;
