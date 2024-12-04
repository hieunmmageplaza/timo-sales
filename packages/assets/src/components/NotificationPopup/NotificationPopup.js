import React from 'react';
import './NoticationPopup.scss';
import PropTypes from 'prop-types';

const NotificationPopup = ({setting = {}, notificationData = {}}) => {
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
  firstName: PropTypes.string,
  city: PropTypes.string,
  country: PropTypes.string,
  productName: PropTypes.string,
  timestamp: PropTypes.string,
  productImage: PropTypes.string
};

export default NotificationPopup;
