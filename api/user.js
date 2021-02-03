import axios from 'axios';
const SERVER_URL = process.env.SERVER_URL;
import { useSelector } from 'react-redux';

/**
 * Gets user data object from API and returns
 * a slice of that object.
 *
 * @param {*} token JWT token
 * @param {*} email email string corresponding to provided credentials
 */
export const getUserData = async () => {
  try {
    const { email, token } = useSelector((s) => s.auth);
    const response = await axios({
      method: 'GET',
      url: `${SERVER_URL}/users/${email}_token=${token}`
    });

    // destructure non sensitive info === PASSWORD SHOULD NOT BE RETURNED FROM SERVER PERIOD!
    const { name, isVerified, isAdmin, workspaces, questions, metadata } = response.account;

    return { name, isVerified, isAdmin, workspaces, questions, metadata };
  } catch (err) {
    throw new Error(err);
  }
};
