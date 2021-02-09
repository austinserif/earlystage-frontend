import React from 'react';
import { Button, Form, Message } from 'semantic-ui-react';

const EmailVerification = () => (
  <div>
    <Message
      success
      header="Welcome to our site!"
      content="Fill out the form below to sign-up for a new account"
    />

    <Form className="attached fluid segment">
      <Form.Input fluid label="Verification Code" placeholder="12345" type="text" size="massive" />
      <Button color="blue" size="massive">
        Submit
      </Button>
    </Form>
  </div>
);

export default EmailVerification;
