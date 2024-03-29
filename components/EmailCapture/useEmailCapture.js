import { useState } from 'react';
import { clientValidation, submitEmail } from './apis';

/**
 * useEmailCapture coordinates client-side and
 * server-side validation of an email when
 * provided by a user who wants to create
 * a new account.
 */
const useEmailCapture = () => {
  // initialize the value of the email capture form to an empty string
  const [email, setEmail] = useState('');

  // define `isLoading`, `error`, and `banner` properties
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false); // this will either be false, or an object containing two properties: `content`, and `pointing`
  const [banner, setBanner] = useState(false); // this will either be false, or an object containing two properties:

  /** Resets the email value in state to an empty string */
  const resetEmail = () => {
    setEmail(() => '');
  };

  /** updates the `email` value in state whenever
   * a keystroke event triggers an update to the input
   * field.
   */
  const handleChange = (e) => {
    // if an error exists in state, clear it once the user starting editing field
    if (error) setError(() => false);

    // update email field
    setEmail(() => e.target.value);
  };

  const handleSubmit = async () => {
    try {
      // set form into loading mode while checks are made
      setIsLoading(() => true);

      // client side checks, throws an error if a check fails
      clientValidation(email);

      // submit email to server if client validation is passed
      const response = await submitEmail(email);

      // reset the input field
      resetEmail();

      // set the banner message to response string
      setBanner(() => ({ header: response.header, paragraph: response.paragraph }));

      setIsLoading(() => false);
    } catch (err) {
      if (!err.fromClient) {
        setError(() => ({
          content: 'An active user is already associated with this email',
          pointing: 'below'
        }));
        return setIsLoading(() => false);
      }

      // handle error by formatting error message props into obj
      setError(() => ({ content: err.message, pointing: 'below' }));

      setIsLoading(() => false);
    }
  };

  const handleDismiss = () => {
    setBanner(() => false);
  };

  return [email, error, banner, isLoading, handleChange, handleSubmit, handleDismiss];
};

export default useEmailCapture;
