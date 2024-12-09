import React from 'react';
import ReactDOM from 'react-dom/client';
import NotificationPopup from '../../assets/src/components/NotificationPopup/NotificationPopup';
import ApiManager from './managers/ApiManager';
import DisplayManager from './managers/DisplayManager';

(async () => {
  console.log(`%c Timo-sales-pop xxxx `, 'background: red; color: white');
  const setting = window?.AVADA_SP;
  const apiManager = new ApiManager();
  const displayManager = new DisplayManager();
  const {notifications1} = await apiManager.getApiData();
  displayManager.initialize({notifications1, setting});

  // async function getShopData() {
  //   try {
  //     const response = await fetch(`http://localhost:5050/clientApi/shop?domain=${shopDomain}`);
  //     if (!response.ok) {
  //       throw new Error('Error');
  //     }
  //     return await response.json();
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // }
  // const {data: notifications} = await getShopData();
  //
  // const {firstDelay, popsInterval, displayDuration} = setting;
  //
  // function delay(ms) {
  //   return new Promise(resolve => setTimeout(resolve, ms * 1000));
  // }
  //
  // async function showPopupsSequentially(notifications = []) {
  //   for (let i = 0; i < notifications.length; i++) {
  //     await delay(i === 0 ? firstDelay : popsInterval);
  //
  //     const container = document.createElement('div');
  //     container.id = 'avada-sales-pop';
  //
  //     document.body.appendChild(container);
  //     const root = ReactDOM.createRoot(container);
  //     root.render(
  //       <NotificationPopup setting={setting} notificationData={notifications[i]} isStoreFront />
  //     );
  //     await delay(displayDuration);
  //     document.body.removeChild(container);
  //   }
  // }
  //
  // await showPopupsSequentially(notifications);
})();
