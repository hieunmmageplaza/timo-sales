import React from 'react';
import {DEFAULT_DESKTOP_POSITION} from '@assets/const/Notification';
import {BlockStack, InlineStack} from '@shopify/polaris';

import './style.scss';

export default function DesktopPosition({
  value = null,
  onChange = _ => {},
  options = DEFAULT_DESKTOP_POSITION
}) {
  return (
    <BlockStack>
      <p>Desktop position</p>
      <InlineStack gap="400">
        {options.map((option, key) => (
          <div
            key={key}
            className={`Avada-DesktopPosition ${
              value === option.value ? 'Avada-DesktopPosition--selected' : ''
            }`}
            onClick={() => onChange(option.value)}
          >
            <div
              className={`Avada-DesktopPosition__Input Avada-DesktopPosition__Input--${option.value}`}
            ></div>
          </div>
        ))}
      </InlineStack>
      <p>The display position of the pop on your website</p>
    </BlockStack>
  );
}
