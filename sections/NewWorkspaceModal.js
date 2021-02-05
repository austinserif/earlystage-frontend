import React, { useEffect, useState } from 'react';
import { Modal, Button, Input, Form, Message } from 'semantic-ui-react';
import useLogin from '../hooks/useLogin';
import { emailRegex } from '../utils/regex';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/dist/client/router';

const NewWorkspaceModal = ({ open, setOpen, inverted }) => {

  const [workspaceName, setWorkspaceName] = useState("");
  return (
    <Modal
      closeOnEscape={false}
      closeOnDimmerClick={false}
      size="tiny"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button inverted={inverted}>Login</Button>}>
      <Modal.Header>Login</Modal.Header>
      <Modal.Content>
        <Form loading={isLoading} error={!authErrorMessage ? false : true} onSubmit={handleSubmit}>
          <Form.Field
            id="form-input-control-name"
            control={Input}
            fluid
            label="Company Name"
            name="company"
            value={email}
            placeholder="Email"
            onChange={handleChange}
          />
          {authErrorMessage ? (
            <Message error header="Error" content={authErrorMessage || ''} />
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
          disabled={isLoading || !values.email.match(emailRegex) || values.password.length < 7}
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
