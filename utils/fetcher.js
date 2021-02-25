import axios from 'axios';
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

// global config because this part won't change
const getRequest = {
  baseURL: SERVER_URL,
  method: 'GET'
};

/**
 * Takes the PATH (note this does not include the base url/ domain) string
 * and executes a get request to that endpoint
 * @param {String} url the url path
 */
const fetcher = (url) => axios({ ...getRequest, url }).then((res) => res.data);

export default fetcher;
