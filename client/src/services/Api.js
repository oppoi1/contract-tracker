import axios from 'axios';

/**
 * Base URL to call api
 */
export default () => {
  return axios.create({
    baseURL: `http://localhost:3001`
  });
};
