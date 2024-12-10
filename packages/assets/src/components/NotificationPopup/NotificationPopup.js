import React from 'react';
import './NoticationPopup.scss';
import PropTypes from 'prop-types';
import {DEFAULT_SETTINGS_CONFIG} from '../../const/Notification';

const NotificationPopup = ({
  setting = DEFAULT_SETTINGS_CONFIG,
  notificationData = {
    firstName: 'John Doe',
    lastName: '',
    city: 'New York',
    country: 'United States',
    productName: 'Puffer Jacket With Hidden Hood',
    timeAgo: '1 day ago',
    productImage:
      'https://plus.unsplash.com/premium_photo-1682125177822-63c27a3830ea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2hvZXN8ZW58MHx8MHx8fDA%3D'
  },
  isStoreFront = false
}) => {
  const {
    firstName = '',
    lastName = '',
    city,
    country,
    productName,
    timeAgo,
    productImage
  } = notificationData;
  const {position, hideTimeAgo} = setting;
  return (
    <div
      className={`Avava-SP__Wrapper fadeInUp animated ${position && isStoreFront ? position : ''} ${
        isStoreFront ? '_storeFront' : '_admin'
      }`}
    >
      <div className="Avava-SP__Inner">
        <div className="Avava-SP__Container">
          <a href="#" className={'Avava-SP__LinkWrapper'}>
            <div
              className="Avava-SP__Image"
              style={{
                backgroundImage: `url(${productImage})`
              }}
            ></div>
            <div className="Avada-SP__Content">
              <div className={'Avada-SP__Title'}>
                {firstName} {lastName} in {city}, {country}
              </div>
              <div className={'Avada-SP__Subtitle'}>purchased {productName}</div>
              <div className={'Avada-SP__Footer'}>
                {!hideTimeAgo && timeAgo}
                <span className="uni-blue">
                  <i className="fa fa-check" aria-hidden="true" /> by Avada
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

NotificationPopup.propTypes = {
  setting: PropTypes.object,
  notificationData: PropTypes.object,
  isStoreFront: PropTypes.bool
};

export default NotificationPopup;
