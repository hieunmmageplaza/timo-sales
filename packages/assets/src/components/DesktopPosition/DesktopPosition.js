import React from 'react';
import {DEFAULT_DESKTOP_POSITION} from '@assets/const/Notification';
import {BlockStack, InlineStack} from '@shopify/polaris';

import './style.scss';
import {Skela} from 'react-skela';
import PropTypes from 'prop-types';

export default function DesktopPosition({
  value = null,
  onChange = _ => {},
  options = DEFAULT_DESKTOP_POSITION,
  loading = false
}) {
  return (
    <BlockStack>
      <p>Desktop position</p>
      <InlineStack gap="400">
        {options.map((option, index) => {
          return <Skela key={index} width={'150px'} height={'80px'} />;
        })}
      </InlineStack>
      <InlineStack gap="400">
        {options.map((option, index) =>
          loading ? (
            <Skela key={index} width="150px" height="80px" />
          ) : (
            <div
              key={index}
              className={`Avada-DesktopPosition ${
                value === option.value ? 'Avada-DesktopPosition--selected' : ''
              }`}
              onClick={() => onChange(option.value)}
            >
              <div
                className={`Avada-DesktopPosition__Input Avada-DesktopPosition__Input--${option.value}`}
              ></div>
            </div>
          )
        )}
      </InlineStack>
      <p>The display position of the pop on your website</p>
    </BlockStack>
  );
}

DesktopPosition.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array,
  loading: PropTypes.bool
};
