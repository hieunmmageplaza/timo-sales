import React, {useContext} from 'react';
import {BlockStack, Select, TextField} from '@shopify/polaris';
import {ShoppingSettingsContext} from '@assets/Context/ShopSettingConext';

const TriggerTabContent = ({}) => {
  const {settings, handleInputChange} = useContext(ShoppingSettingsContext);
  const options = [
    {label: 'All pages', value: 'all'},
    {label: 'Specific pages', value: 'specific'}
  ];
  const {allowShow = 'all', includedUrls, excludedUrls} = settings;
  return (
    <BlockStack gap="200">
      <Select
        label="PAGES RESTRICTION"
        options={options}
        id="allowShow"
        onChange={handleInputChange}
        value={allowShow}
      />
      {allowShow !== 'all' && (
        <TextField
          id="includedUrls"
          label="Included pages"
          value={includedUrls}
          onChange={handleInputChange}
          helpText="Pages URL NOT to show the pop-up(separated by lines)"
          multiline={4}
          autoComplete="off"
        />
      )}
      <TextField
        id="excludedUrls"
        label="Excluded pages"
        value={excludedUrls}
        onChange={handleInputChange}
        helpText="Pages URL to show the pop-up(separated by lines)"
        multiline={4}
        autoComplete="off"
      />
    </BlockStack>
  );
};
export default TriggerTabContent;
