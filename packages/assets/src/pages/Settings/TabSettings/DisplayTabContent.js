import React from 'react';
import {BlockStack, Button, Checkbox, FormLayout, Grid, RangeSlider, Text} from '@shopify/polaris';
import DesktopPosition from '@assets/components/DesktopPosition';
import PropTypes from 'prop-types';

const DisplayTabContent = ({settings, handleInputChange, loading = false}) => {
  const {
    position,
    displayDuration,
    firstDelay,
    popsInterval,
    maxPopsDisplay,
    hideTimeAgo,
    truncateProductName
  } = settings;

  const TIMING_ITEMS = [
    {
      id: 0,
      label: 'Display duration',
      description: 'How long each pop will display on your page.',
      keyValue: 'displayDuration',
      value: displayDuration
    },
    {
      id: 1,
      label: 'Time before the first pop',
      description: 'The delay time before the first notification.',
      keyValue: 'firstDelay',
      value: firstDelay
    },
    {
      id: 2,
      label: 'Gap time between two pops',
      description: 'The time interval between tow popup notifications.',
      keyValue: 'popsInterval',
      value: popsInterval
    },
    {
      id: 3,
      label: 'Maximum of popups',
      description:
        'The maximum number of popups are allowed to show after page loading. Maxium number is 80.',
      keyValue: 'maxPopsDisplay',
      value: maxPopsDisplay
    }
  ];
  return (
    <FormLayout>
      <BlockStack>
        <Text as={'h2'}>APPEARANCE</Text>
        <DesktopPosition
          value={position}
          onChange={val => handleInputChange(val, 'position')}
          loading={loading}
        />
        <Checkbox
          label="Hide time ago"
          checked={hideTimeAgo}
          id={'hideTimeAgo'}
          onChange={handleInputChange}
          disabled={loading}
        />
        <Checkbox
          label="Truncate content text"
          id="truncateProductName"
          helpText="If you product name is long for one line, it will be truncated to 'Product na..'"
          checked={truncateProductName}
          onChange={handleInputChange}
          disabled={loading}
        />
        <Text as={'h2'}>TIMING</Text>
        <Grid
          columns={{
            lg: 2,
            xl: 2,
            md: 2,
            sm: 1,
            xs: 1
          }}
        >
          {TIMING_ITEMS.map((item, idx) => (
            <RangeSlider
              id={item.keyValue}
              key={idx}
              output
              helpText={item.description}
              label={item.label}
              max={20}
              value={item.value}
              onChange={handleInputChange}
              suffix={<Button disabled>{item.value} second(s)</Button>}
              disabled={loading}
            />
          ))}
        </Grid>
      </BlockStack>
    </FormLayout>
  );
};
export default DisplayTabContent;

DisplayTabContent.propTypes = {
  settings: PropTypes.array,
  handleInputChange: PropTypes.func,
  loading: PropTypes.bool
};
