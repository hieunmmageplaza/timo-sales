import makeRequest from '../helper/api/makeRequest';
import 'regenerator-runtime/runtime';

export default class ApiManager {
  getApiData = async () => {
    const apiUrl = `http://localhost:5050/clientApi/shop?domain=${window.location.hostname}`;
    return await makeRequest({url: apiUrl});
  };

  getShopData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5050/clientApi/shop?domain=${window.location.hostname}`
      );
      if (!response.ok) {
        throw new Error('Error');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
}
