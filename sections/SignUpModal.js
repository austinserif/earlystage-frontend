import React from 'react';
import { Modal, Button, Input, Form, Message } from 'semantic-ui-react';
import { emailRegex } from '../utils/regex';
import useSignUp from '../hooks/useSignUp';
import { useSelector } from 'react-redux';

const SignUpModal = ({ open, setOpen, inverted }) => {
  const [values, handleChange, handleReset, handleSubmit] = useSignUp();

  const { isLoading, authErrorMessage } = useSelector((s) => s.auth);

  return (
    <Modal
      closeOnEscape={false}
      closeOnDimmerClick={false}
      size="tiny"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button inverted={inverted}>Sign Up</Button>}>
      <Modal.Header>Sign Up</Modal.Header>
      <Modal.Content>
        <Form loading={isLoading} error={!authErrorMessage ? false : true}>
          <Form.Field
            id="form-input-control-name"
            control={Input}
            fluid
            label="Name"
            name="name"
            value={values.name}
            placeholder="Name"
            onChange={handleChange}
            error={authErrorMessage ? true : false}
          />
          <Form.Field
            id="form-input-control-email"
            control={Input}
            fluid
            label="Email"
            name="email"
            value={values.email}
            placeholder="Email"
            onChange={handleChange}
            error={authErrorMessage ? true : false}
          />
          <Form.Field
            id="form-input-control-password"
            control={Input}
            fluid
            label="Password"
            name="password"
            type="password"
            value={values.password}
            placeholder="Password"
            onChange={handleChange}
            error={authErrorMessage ? true : false}
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
          onClick={async () => await handleSubmit()}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};

export default SignUpModal;
