import React from 'react';
import './NoticationPopup.scss';
import PropTypes from 'prop-types';

const NotificationPopup = ({
  setting = {},
  notificationData = {
    firstName: 'John Doe',
    city: 'New York',
    country: 'United States',
    productName: 'Puffer Jacket With Hidden Hood',
    timestamp: '1 day ago',
    productImage:
      'https://plus.unsplash.com/premium_photo-1682125177822-63c27a3830ea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2hvZXN8ZW58MHx8MHx8fDA%3D'
  }
}) => {
  const {firstName, city, country, productName, timestamp, productImage} = notificationData;
  const {position, hideTimeAgo} = setting;
  console.log('🎅🎅🎅render');

  return (
    <div className={`Avava-SP__Wrapper fadeInUp animated ${position}`}>
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
                {firstName} in {city}, {country}
              </div>
              <div className={'Avada-SP__Subtitle'}>purchased {productName}</div>
              <div className={'Avada-SP__Footer'}>
                {!hideTimeAgo && timestamp}
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
  notificationData: PropTypes.object
};

export default NotificationPopup;
