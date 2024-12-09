import makeRequest from '../helper/api/makeRequest';
import 'regenerator-runtime/runtime';

export default class ApiManager {
  getApiData = async () => {
    const apiUrl = `http://localhost:5050/clientApi/shop?domain=${window.location.hostname}`;
    return await makeRequest({url: apiUrl});
  };
}
