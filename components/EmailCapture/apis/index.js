import EarlystageError from '../../../errors/EarlystageError';
import { emailRegex } from '../../../utils/regex';
import axios from 'axios';
import { SERVER_URL } from '../../../config';

/** Validates email input on client using
 * email regex matching. Any failed test
 * will result in an error.
 *
 * @param {String} emailString
 */
export const clientValidation = (emailString) => {
  // check that email string is not empty
  if (emailString === '') throw new EarlystageError('Please enter an email', 400);

  // check that email string matches email regex
  if (!emailString.match(emailRegex))
    throw new EarlystageError('Not a valid email, check for typos and try again!');
};

/**
 * Submits valid email string to server.
 * @param {String} emailString
 */
export const submitEmail = async (emailString) => {
  try {
    // defines an axios config object
    const config = {
      method: 'POST',
      baseURL: SERVER_URL,
      url: `/register?email=${emailString}`
    };

    // make request and store response in variable
    const response = await axios(config); // should contain `message` property

    // returns the message property from response obj, which will
    // be displayed on client as a success banner.
    return response.data.message; // should contain `header` and `paragraph` properties
  } catch (err) {
    // handle and re-format an unformatted errors
    throw new EarlystageError(err.message, err.statusCode || 500);
  }
};
