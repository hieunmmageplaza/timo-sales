import ApiManager from './managers/ApiManager';
import DisplayManager from './managers/DisplayManager';

(async () => {
  console.log(`%c Timo-sales-pop xxxx `, 'background: red; color: white');
  const apiManager = new ApiManager();
  const displayManager = new DisplayManager();
  const {data: notifications} = await apiManager.getShopData();
  displayManager.initialize({notifications});
})();
