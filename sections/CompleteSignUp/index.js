import { Header, Form, Button } from 'semantic-ui-react';
import useCompleteSignUp from './useCompleteSignUp';
import { useRouter } from 'next/dist/client/router';

const CompleteSignUp = () => {
  const router = useRouter();
  const [values, errors, isLoading, handleChange, handleSubmit, success] = useCompleteSignUp(
    router.query.code
  );
  if (success) {
    return (
      <>
        <Header>
          Success! Congrats on creating a new account, to log in click the link below to navigate to
          the home page.
        </Header>
        <Button
          onClick={() => {
            router.push('/');
          }}>
          Go Home!
        </Button>
      </>
    );
  }
  return (
    <>
      <Header>Finish Creating Your Account</Header>
      <Form loading={isLoading}>
        <Form.Input
          error={!errors.firstName ? false : { content: errors.firstName, pointing: 'above' }}
          fluid
          value={values.firstName}
          onChange={handleChange}
          name="firstName"
          label="First name"
          placeholder="First name"
          id="form-input-first-name"
        />
        <Form.Input
          error={!errors.lastName ? false : { content: errors.lastName, pointing: 'above' }}
          fluid
          value={values.lastName}
          onChange={handleChange}
          name="lastName"
          label="Last name"
          placeholder="Last name"
        />
        <Form.Input
          error={!errors.password ? false : { content: errors.password, pointing: 'above' }}
          fluid
          value={values.password}
          onChange={handleChange}
          name="password"
          id="form-input-password"
          type="password"
          label="Password"
          placeholder="Password"
        />
        <Form.Checkbox
          label="I agree to the terms and conditions"
          id="termsAndConditions"
          name="termsAndConditions"
          checked={values.termsAndConditions}
          onChange={handleChange}
          error={
            !errors.termsAndConditions
              ? false
              : {
                  content: errors.termsAndConditions,
                  pointing: 'left'
                }
          }
        />
        <Button type="button" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default CompleteSignUp;
