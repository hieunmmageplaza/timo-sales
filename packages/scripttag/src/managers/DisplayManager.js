import React from 'react';
import ReactDOM from 'react-dom';
import NotificationPopup from '../../../assets/src/components/NotificationPopup/NotificationPopup';

export default class DisplayManager {
  initialize({notifications, settings = {}}) {
    this.notifications = notifications;
    this.settings = settings;
    this.showPopupsSequentially().then();
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms * 1000));
  }

  async showPopupsSequentially() {
    const {firstDelay = 1, popsInterval = 3, displayDuration = 5} = this.settings;

    if (!this.notifications || this.notifications.length === 0) return;

    const container = document.createElement('div');
    container.id = 'avada-sales-pop';
    document.body.appendChild(container);

    for (let i = 0; i < this.notifications.length; i++) {
      const notification = this.notifications[i];

      await this.delay(i === 0 ? firstDelay : popsInterval);

      const root = ReactDOM.createRoot(container);
      root.render(
        <NotificationPopup
          setting={this.settings}
          notificationData={notification}
          isStoreFront={true}
        />
      );

      await this.delay(displayDuration);

      root.unmount();
    }

    document.body.removeChild(container);
  }
}
