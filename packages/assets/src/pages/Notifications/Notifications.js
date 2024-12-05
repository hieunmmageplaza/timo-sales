import React from 'react';
import {Card, Page, ResourceList} from '@shopify/polaris';
import ProductItem from '@assets/components/ProductItem';
import useFetchApi from '@assets/hooks/api/useFetchApi';

/**
 * Render a home page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Notifications() {
  const {data = [], loading} = useFetchApi({
    url: '/notifications'
  });
  return (
    <Page fullWidth title="Notifications" subtitle="List of sales notification from Shopify">
      <Card>
        <ResourceList
          loading={loading}
          items={data}
          resourceName={{
            plural: 'notifications',
            singular: 'notification'
          }}
          renderItem={renderResourceItem}
        />
      </Card>
    </Page>
  );
}
const renderResourceItem = item => <ProductItem {...item} />;
