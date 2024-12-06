import React from 'react';
import ReactDOM from 'react-dom/client';
import NotificationPopup from '../../assets/src/components/NotificationPopup/NotificationPopup';
import makeRequest from './helper/api/makeRequest';

(async () => {
  console.log(`%c Timo-sales-pop 123 `, 'background: red; color: white');
  const shopDomain = window.location.hostname;
  console.log('🎅🎅🎅', shopDomain);

  async function getData() {
    const response = await fetch(`http://localhost:5050/clientApi/shop?domain=${shopDomain}`, {
      mode: 'no-cors'
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log('🎅🎅🎅response', response);

    return await response.json();
  }

  // const result = await makeRequest(
  //   `http://localhost:5050/clientApi/shop?domain=${shopDomain}`
  // );

  // const result = await getData();

  const setting = window?.TIMO;
  const {firstDelay, popsInterval, displayDuration} = setting;
  const notifications = [
    {
      firstName: 'timo',
      city: 'Hanoi',
      country: 'Vietnam',
      shopId: 'N91TObN0j4mYDbSG3CFi',
      timeAgo: '1 day ago',
      productName: 'Iphone16',
      productId: '1',
      productImage:
        'https://cdn.shopify.com/s/files/1/0676/3534/7631/files/snowboard_sky.png?v=1733042402'
    },
    {
      firstName: 'Hieu',
      city: 'HCM',
      country: 'Vietnam',
      shopId: 'N91TObN0j4mYDbSG3CFi',
      timeAgo: '10 day ago',
      productName: 'Iphone17',
      productId: '2',
      productImage:
        'https://cdn.shopify.com/s/files/1/0676/3534/7631/files/Main_b13ad453-477c-4ed1-9b43-81f3345adfd6.jpg?v=1733042402'
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
      const root = ReactDOM.createRoot(container);
      root.render(
        <NotificationPopup setting={setting} notificationData={notifications[i]} isStoreFront />
      );
      await delay(displayDuration);
      document.body.removeChild(container);
    }
  }

  await showPopupsSequentially(notifications);
})();
