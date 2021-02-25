import React, { useEffect } from 'react';
import { Modal, Button, Input, Form, Message } from 'semantic-ui-react';
import useLogin from '../hooks/useLogin';
import { emailRegex } from '../utils/regex';
import { useSelector } from 'react-redux';

/**
 * `LoginModal` is renders a Login button that opens
 * a login form when selected.
 *
 * @param {Object} props
 * @param {Boolean} props.open
 * @param {Function} props.setOpen
 * @inver
 */
const LoginModal = ({ open, setOpen, inverted }) => {
  const { isLoading, authErrorMessage } = useSelector((s) => s.auth);

  const [values, handleChange, handleReset, handleSubmit] = useLogin();
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
            id="form-input-control-email"
            control={Input}
            fluid
            label="Email"
            name="email"
            value={values.email}
            placeholder="Email"
            onChange={handleChange}
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

export default LoginModal;
