import React, {useState} from 'react';
import {Card, Page, ResourceList} from '@shopify/polaris';
import ProductItem from '@assets/components/ProductItem';
import {SORT_OPTIONS} from '@assets/const/Notification';

/**
 * Render a home page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Notifications() {
  const [sortValue, setSortValue] = useState('DATE_MODIFIED_DESC');
  const data = [
    {
      id: 1,
      country: 'Viet Nam',
      productImage:
        'https://hieutimonew.myshopify.com/cdn/shop/files/Main_b13ad453-477c-4ed1-9b43-81f3345adfd6.jpg?v=1733042402&width=1500',
      timestamp: '2024-05-27T23:08:33-04:00',
      productName: 'Sport Shoes',
      timeAgo: '1 hour ago'
    },
    {
      id: 2,
      country: 'America',
      productImage:
        'https://hieutimonew.myshopify.com/cdn/shop/files/Main_b13ad453-477c-4ed1-9b43-81f3345adfd6.jpg?v=1733042402&width=1500',
      timestamp: '2029-01-27T23:08:33-04:00',
      productName: 'Sport Clothes',
      timeAgo: '10 hour ago'
    }
  ];
  return (
    <Page fullWidth title="Notifications" subtitle="List of sales notification from Shopify">
      <Card>
        <ResourceList
          items={data}
          resourceName={{
            plural: 'notifications',
            singular: 'notification'
          }}
          onSortChange={selected => setSortValue(selected)}
          sortValue={sortValue}
          renderItem={renderResourceItem}
          sortOptions={SORT_OPTIONS}
        />
      </Card>
    </Page>
  );
}
const renderResourceItem = items => <ProductItem {...items} />;
