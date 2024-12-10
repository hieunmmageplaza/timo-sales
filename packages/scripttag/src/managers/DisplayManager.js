import React from 'react';
import ReactDOM from 'react-dom/client';
import NotificationPopup from '../../../assets/src/components/NotificationPopup/NotificationPopup';

export default class DisplayManager {
  initialize({notifications}) {
    this.notifications = notifications;
    this.settings = window.AVADA_SP;
    this.container = null;
    this.root = null;
    this.insertContainer();
    this.showPopupsSequentially().then();
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms * 1000));
  }

  insertContainer() {
    this.container = document.createElement('div');
    this.container.id = 'avada-sales-pop';
    document.body.appendChild(this.container);
    this.root = ReactDOM.createRoot(this.container);
  }

  showPopupsSequentially = async () => {
    const {firstDelay = 1, popsInterval = 3, displayDuration = 5} = this.settings;
    if (!this.notifications || this.notifications.length === 0) return;

    for (let i = 0; i < this.notifications.length; i++) {
      const notification = this.notifications[i];

      await this.delay(i === 0 ? firstDelay : popsInterval);

      this.root.render(
        <NotificationPopup
          setting={this.settings}
          notificationData={notification}
          isStoreFront={true}
        />
      );

      await this.delay(displayDuration);
    }

    document.body.removeChild(this.container);
  };
}
