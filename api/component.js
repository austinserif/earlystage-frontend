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
