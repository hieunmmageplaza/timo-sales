import React from 'preact/compat';
import {createRoot} from 'react-dom/client';
import NotificationPopup from '../../assets/src/components/NotificationPopup/NotificationPopup';
import makeRequest from './helper/api/makeRequest';

(async () => {
  console.log(`%c Timo-sales-pop `, 'background: red; color: white');
  // const result = await makeRequest(
  //   'http://localhost:5050/clientApi/shop?domain=hieutimonew.myshopify.com'
  // );
  const setting = window?.TIMO;
  const {firstDelay, popsInterval, displayDuration} = setting;
  const notifications = [
    {
      firstName: 'timo',
      city: 'Hanoi',
      country: 'Vietnam',
      shopId: 'N91TObN0j4mYDbSG3CFi',
      timeStamp: new Date(),
      productName: 'Iphone16',
      productId: '1',
      productImage:
        'https://hieutimonew.myshopify.com/cdn/shop/files/Main_0a4e9096-021a-4c1e-8750-24b233166a12.jpg?v=1733042401&width=990'
    },
    {
      firstName: 'Hieu',
      city: 'HCM',
      country: 'Vietnam',
      shopId: 'N91TObN0j4mYDbSG3CFi',
      timeStamp: new Date(),
      productName: 'Iphone17',
      productId: '2',
      productImage:
        'https://hieutimonew.myshopify.com/cdn/shop/files/Main_0a4e9096-021a-4c1e-8750-24b233166a12.jpg?v=1733042401&width=990'
    }
  ];

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms * 1000));
  }

  async function showPopupsSequentially(notifications) {
    for (let i = 0; i < notifications.length; i++) {
      await delay(i === 0 ? firstDelay : popsInterval);

      const container = document.createElement('div');
      container.id = 'avada-sales-pop';

      document.body.appendChild(container);
      const root = createRoot(container);
      root.render(<NotificationPopup setting={setting} notificationData={notifications[i]} />);
      console.log('==>render done');
      await delay(displayDuration);
      document.body.removeChild(container);
    }
  }

  await showPopupsSequentially(notifications);
})();
