import React from 'react';
import { Form, Input, Label } from 'semantic-ui-react';
import useEmailCapture from './useEmailCapture';
import Banner from '../Banner';

const EmailCapture = () => {
  const [
    email,
    error,
    banner,
    isLoading,
    handleChange,
    handleSubmit,
    handleDismiss
  ] = useEmailCapture();
  return (
    <>
      <Form loading={isLoading}>
        <Form.Field error={!error ? false : true}>
          {!error ? null : (
            <Label pointing={error.pointing} color="red">
              {error.content}
            </Label>
          )}
          <Input
            fluid
            onChange={handleChange}
            value={email}
            action={{
              onClick: handleSubmit,
              labelPosition: 'right',
              icon: 'arrow right',
              content: 'Sign Up',
              color: 'yellow',
              disabled: isLoading
            }}
          />
        </Form.Field>
      </Form>
      {banner ? (
        <Banner handleDismiss={handleDismiss} header={banner.header} paragraph={banner.paragraph} />
      ) : null}
    </>
  );
};

export default EmailCapture;
