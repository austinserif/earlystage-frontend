import React from 'react';
import { Modal, Button, Input, Form, Message, Icon } from 'semantic-ui-react';
import useNewWorkspace from '../hooks/useNewWorkspace';
import { useSelector } from 'react-redux';
import parseCookies from '../utils/parseCookies';

const NewWorkspaceModal = ({ open, setOpen }) => {
  const cookies = parseCookies('token', 'email');
  const { token, email } = cookies;
  const { isLoading, newWorkspaceErrMsg } = useSelector((s) => s.user.workspaces);
  const [values, handleChange, handleReset, handleSubmit] = useNewWorkspace(
    { email, token },
    setOpen
  );
  return (
    <Modal
      closeOnEscape={false}
      closeOnDimmerClick={false}
      size="tiny"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button animated color="green">
          <Button.Content visible>New Workspace</Button.Content>
          <Button.Content hidden>
            <Icon name="add" />
          </Button.Content>
        </Button>
      }>
      <Modal.Header>New Company Workspace</Modal.Header>
      <Modal.Content>
        <Form
          loading={isLoading}
          error={!newWorkspaceErrMsg ? false : true}
          onSubmit={handleSubmit}>
          <Form.Field
            id="form-input-control-name"
            control={Input}
            fluid
            label="Company Name"
            name="name"
            value={values.name}
            placeholder="Name"
            onChange={handleChange}
          />
          <Form.Field
            id="form-input-control-domain"
            control={Input}
            fluid
            label="Domain or Web Address"
            name="domain"
            value={values.domain}
            placeholder="Domain"
            onChange={handleChange}
          />
          {newWorkspaceErrMsg ? (
            <Message error header="Error" content={newWorkspaceErrMsg || ''} />
          ) : null}
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          disabled={isLoading}
          content="Cancel"
          onClick={() => {
            handleReset();
            setOpen(false);
          }}
        />
        <Button
          disabled={isLoading || values.name.length < 1 || values.domain.length < 4}
          content="Submit"
          labelPosition="right"
          icon="checkmark"
          onClick={handleSubmit}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};

export default NewWorkspaceModal;
