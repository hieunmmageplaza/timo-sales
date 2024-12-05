import React, {useState} from 'react';
import {Button, Card, InlineStack, Layout, Page, Tabs} from '@shopify/polaris';
import DisplayTabContent from '@assets/pages/Settings/TabSettings/DisplayTabContent';
import TriggerTabContent from '@assets/pages/Settings/TabSettings/TriggerTabContent';
import useEditApi from '@assets/hooks/api/useEditApi';
import useFetchApi from '@assets/hooks/api/useFetchApi';
import NotificationPopup from '@assets/components/NotificationPopup/NotificationPopup';
import {ShoppingSettingsContext} from '@assets/Context/ShopSettingConext';

/**
 * @return {JSX.Element}
 */
export default function Settings() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const {data: settings, setData: setSettings, loading} = useFetchApi({
    url: '/settings'
  });
  const {handleEdit: handleSaveSettings, editing: saving} = useEditApi({
    url: '/settings'
  });
  const {handleEdit: handleTestFunction} = useEditApi({
    url: '/test',
    useToast: false
  });

  const handleInputChange = (value, key) => {
    setSettings(prev => ({...prev, [key]: value}));
  };

  const handleSave = async () => {
    await handleSaveSettings(settings);
  };

  const handleTabChange = selectedTabIndex => setSelectedTabIndex(selectedTabIndex);
  const tabs = [
    {
      id: 'display-tabs',
      content: 'Display',
      children: <DisplayTabContent />,
      panelID: 'all-customers-content-1'
    },
    {
      id: 'trigger-tabs',
      content: 'Triggers',
      children: <TriggerTabContent />,
      panelID: 'prospects-content-1'
    }
  ];

  return (
    <ShoppingSettingsContext.Provider
      value={{settings, setSettings, loading, saving, handleInputChange}}
    >
      <Page
        title="Settings"
        primaryAction={{content: 'Save', onAction: handleSave, loading: loading || saving}}
        subtitle="Decide how your notifications will display"
        fullWidth
      >
        <Button onClick={async () => await handleTestFunction([])}>TEst api</Button>
        <Layout>
          <Layout.Section variant="oneThird">
            <Card>
              <InlineStack blockAlign="center" align="center">
                <NotificationPopup />
              </InlineStack>
            </Card>
          </Layout.Section>

          <Layout.Section>
            <Card>
              <Tabs
                tabs={tabs}
                selected={selectedTabIndex}
                onSelect={handleTabChange}
                disabled={loading}
              >
                <Card>{tabs[selectedTabIndex]?.children}</Card>
              </Tabs>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </ShoppingSettingsContext.Provider>
  );
}
