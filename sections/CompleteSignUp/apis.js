import EarlystageError from '../../errors/EarlystageError';
import axios from 'axios';
import { SERVER_URL } from '../../config';

export const clientValidation = ({ firstName, lastName, password, termsAndConditions }) => {
  let validationErrors = {};

  // first name validation
  if (firstName.length === 0) validationErrors.firstName = 'This field is required';

  // last name validation
  if (lastName.length === 0) validationErrors.lastName = 'This field is required';

  // password validation
  if (password.length < 7) validationErrors.password = 'Passwords must have at least 7 characters';

  // terms and conditions must be true
  if (!termsAndConditions)
    validationErrors.termsAndConditions = 'You must agree to the terms and conditions';

  if (Object.values(validationErrors).length > 0) {
    const error = new EarlystageError('One or more inputs were invalid', 400);
    error.details = validationErrors;
    throw error;
  }
};

export const submitCompletedSignUp = async (id, fields) => {
  try {
    // axios config object
    const config = {
      method: 'POST',
      baseURL: SERVER_URL,
      url: `/register/finish?id=${id}`,
      data: {
        ...fields
      }
    };

    // store response in variable
    const response = await axios(config);

    // return response
    return response;
  } catch (err) {
    throw new EarlystageError('An error occured processing your request', 500);
  }
};
