// import axios from 'axios';
// const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
// import { useSelector } from 'react-redux';

// const getCredentials = () => {
//   const { email, token } = useSelector((s) => s.auth);
//   return {
//     email,
//     token
//   };
// };

// /**
//  * Gets user data object from API and returns
//  * a slice of that object.
//  *
//  * @param {*} token JWT token
//  * @param {*} email email string corresponding to provided credentials
//  */
// export const getUserData = async () => {
//   try {
//     const { email, token } = getCredentials();
//     const response = await axios({
//       method: 'GET',
//       url: `${SERVER_URL}/users/${email}_token=${token}`
//     });

//     const userObject = response.data;

//     // destructure non sensitive info === PASSWORD SHOULD NOT BE RETURNED FROM SERVER PERIOD!
//     const { _id, name, isVerified, isAdmin } = userObject.account;
//     const { workspaces, questions, metadata } = userObject;

//     return { _id, name, email, isVerified, isAdmin, workspaces, questions, metadata };
//   } catch (err) {
//     throw new Error(err);
//   }
// };

// export const getWorkspacesObject = async (workspaceIdArray) => {
//   try {
//     const { email, token } = getCredentials();

//     const getRequest = (url, email, workspaceId, token) =>
//       axios.get(`${url}/users/${email}/workspaces/${workspaceId}?_token=${token}`);

//     // request data for all workspace ids
//     const responses = await axios.all(
//       workspaceIdArray.map((v) => getRequest(SERVER_URL, email, v, token))
//     );

//     // map response data array into a workspace object
//     const workspaces = {};

//     responses.forEach((v) => {
//       const { data } = v; // destructure data object from response
//       const id = data._id; // isolate id
//       delete data._id; // delete id from original object

//       // set key-value pair into workspaces object, where the
//       // key is the workspaceId, and the value is the rest of
//       // the original data response object
//       workspaces[id] = data;
//     });

//     return workspaces;
//   } catch (err) {
//     throw new Error(err);
//   }
// };
