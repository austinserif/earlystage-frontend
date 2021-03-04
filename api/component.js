/** component.js contains wrapper functions for different requests*/
import axios from 'axios';

/**
 * @param {Object} cookies
 * @param {String} cookies.email
 * @param {String} cookies.token
 * @param {String} workspaceId
 * @param {String} componentId
 */
export const deleteRequest = async (cookies, componentId, workspaceId) => {
  try {
    const { email, token } = cookies;
    await axios({
      method: 'DELETE',
      baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
      url: `/users/${email}/workspaces/${workspaceId}/components/${componentId}?_token=${token}`
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * @param {Object} cookies
 * @param {String} cookies.email
 * @param {String} cookies.token
 * @param {String} workspaceId
 * @param {String} questionId
 */
export const postRequest = async (cookies, workspaceId, questionId) => {
  try {
    const { email, token } = cookies;
    const response = await axios({
      method: 'POST',
      baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
      url: `/users/${email}/workspaces/${workspaceId}/components?_token=${token}`,
      data: {
        answer: '',
        questionId
      }
    });
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
};
