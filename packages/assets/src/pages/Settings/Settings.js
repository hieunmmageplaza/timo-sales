import React, {useState} from 'react';
import {BlockStack, Box, Button, Card, InlineStack, Layout, Page, Tabs} from '@shopify/polaris';
import ProductItem from '@assets/components/ProductItem';
import DisplayTabContent from '@assets/pages/Settings/TabSettings/DisplayTabContent';
import TriggerTabContent from '@assets/pages/Settings/TabSettings/TriggerTabContent';
import useEditApi from '@assets/hooks/api/useEditApi';
import useFetchApi from '@assets/hooks/api/useFetchApi';
import NotificationPopup from '@assets/components/NotificationPopup/NotificationPopup';

/**
 * @return {JSX.Element}
 */
export default function Settings() {
  const [selected, setSelected] = useState(0);
  const {data: settings, setData: setSettings, loading} = useFetchApi({
    url: '/settings'
  });
  const {handleEdit: handleSaveSettings, editing: saving} = useEditApi({
    url: '/settings'
  });
  const {handleEdit: handletest} = useEditApi({
    url: '/test',
    useToast: false
  });

  const handleInputChange = (value, key) => {
    setSettings(prev => ({...prev, [key]: value}));
  };
  const handleTabChange = selectedTabIndex => setSelected(selectedTabIndex);
  const tabs = [
    {
      id: 'display-tabs',
      content: 'Display',
      children: (
        <DisplayTabContent
          settings={settings}
          handleInputChange={handleInputChange}
          loading={loading}
        />
      ),
      panelID: 'all-customers-content-1'
    },
    {
      id: 'trigger-tabs',
      content: 'Triggers',
      children: <TriggerTabContent settings={settings} handleInputChange={handleInputChange} />,
      panelID: 'prospects-content-1'
    }
  ];

  const handleSave = async () => {
    await handleSaveSettings(settings);
  };

  return (
    <Page
      title="Settings"
      primaryAction={{content: 'Save', onAction: handleSave, loading: loading || saving}}
      subtitle="Decide how your notifications will display"
      fullWidth
    >
      <Button onClick={async () => await handletest([])}>TEst api</Button>
      <Layout>
        <Layout.Section variant="oneThird">
          <Card>
            <InlineStack blockAlign={'center'} align={'center'}>
              <NotificationPopup />
            </InlineStack>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} disabled={loading}>
              <Card>{tabs[selected].children}</Card>
            </Tabs>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

Settings.propTypes = {};
