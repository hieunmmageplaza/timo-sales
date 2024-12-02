import React, {useState} from 'react';
import {BlockStack, Card, Layout, Page, Tabs} from '@shopify/polaris';
import ProductItem from '@assets/components/ProductItem';
import {DEFAULT_SETTINGS_CONFIG} from '@assets/const/Notification';
import DisplayTabContent from '@assets/pages/Settings/TabSettings/DisplayTabContent';
import TriggerTabContent from '@assets/pages/Settings/TabSettings/TriggerTabContent';
import useEditApi from '@assets/hooks/api/useEditApi';

/**
 * @return {JSX.Element}
 */
export default function Settings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS_CONFIG);
  const [selected, setSelected] = useState(0);
  const handleInputChange = (value, key) => {
    setSettings(prev => ({...prev, [key]: value}));
  };
  const handleTabChange = selectedTabIndex => setSelected(selectedTabIndex);
  const tabs = [
    {
      id: 'display-tabs',
      content: 'Display',
      children: <DisplayTabContent settings={settings} handleInputChange={handleInputChange} />,
      panelID: 'all-customers-content-1'
    },
    {
      id: 'trigger-tabs',
      content: 'Triggers',
      children: <TriggerTabContent settings={settings} handleInputChange={handleInputChange} />,
      panelID: 'prospects-content-1'
    }
  ];

  const {handleEdit} = useEditApi({url: '/settings'});

  const handleTest = async () => {
    await handleEdit(settings);
  };
  return (
    <Page
      title="Settings"
      primaryAction={{content: 'Save', onAction: handleTest}}
      subtitle="Decide how your notifications will display"
      fullWidth
    >
      <Layout>
        <Layout.Section variant="oneThird">
          <BlockStack>
            <Card>
              <ProductItem />
            </Card>
          </BlockStack>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
              <Card>{tabs[selected].children}</Card>
            </Tabs>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

Settings.propTypes = {};
