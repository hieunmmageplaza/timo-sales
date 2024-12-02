import React, {useState} from 'react';
import {Card, Page, ResourceList} from '@shopify/polaris';
import ProductItem from '@assets/components/ProductItem';
import {SORT_OPTIONS} from '@assets/const/Notification';
import useFetchApi from '@assets/hooks/api/useFetchApi';

/**
 * Render a home page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Notifications() {
  const [sortValue, setSortValue] = useState('timestamp:desc');
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
          sortValue={sortValue}
          renderItem={renderResourceItem}
          sortOptions={SORT_OPTIONS}
          onSortChange={selected => {
            setSortValue(selected);
          }}
        />
      </Card>
    </Page>
  );
}
const renderResourceItem = items => <ProductItem {...items} />;
