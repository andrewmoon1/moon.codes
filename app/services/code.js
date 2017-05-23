import { apiEndpoint } from '../../config/app';
import createRestApiClient from '../utils/createRestApiClient';

export default () => {
  const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });
  return {
    getCodes: () => client.request({
      method: 'GET',
      url: '/code/all'
    }),
    deleteCode: ({ id }) => client.request({
      method: 'DELETE',
      url: `/code/${id}`
    }),
    updateCode: ({ id, data }) => client.request({
      method: 'PUT',
      url: `/code/${id}`,
      data
    }),
    createCode: ({ id, data }) => client.request({
      method: 'POST',
      url: `/code/${id}`,
      data
    })
  };
};
