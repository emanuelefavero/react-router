import axios from 'axios';

/**
 * @param {string} url
 * @param {Object} [params]
 * @returns {Promise<any>}
 * @example
 * fetchData(url, { page: 1 })
 */
export const fetchData = async (url, params = {}) => {
  const { data } = await axios.get(url, { params });
  return data;
};
