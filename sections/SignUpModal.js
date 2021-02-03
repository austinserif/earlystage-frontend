import React, { useState, useEffect } from 'react';
import { Modal, Button, Image, Header, Input, Form, Message } from 'semantic-ui-react';
import { emailRegex } from '../utils/regex';
import useSignUp from '../hooks/useSignUp';

const SignUpModal = ({ open, setOpen, inverted }) => {
  const [values, err, handleChange, handleReset, handleSubmit, isLoading] = useSignUp();

  useEffect(() => {
    if (err) {
      console.log(err);
    } else {
      console.log('there is no error message right now');
    }
  }, [err]);
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
        <Form loading={isLoading} error={!err ? false : err}>
          <Form.Field
            id="form-input-control-name"
            control={Input}
            fluid
            label="Name"
            name="name"
            value={values.name}
            placeholder="Name"
            onChange={handleChange}
            error={err ? true : false}
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
            error={err ? true : false}
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
            error={err ? true : false}
          />
          {err ? <Message error header="Error" content={err || ''} /> : null}
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
