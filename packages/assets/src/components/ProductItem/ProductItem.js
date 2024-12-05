import React from 'react';
import PropTypes from 'prop-types';
import {BlockStack, Icon, InlineStack, Link, ResourceItem, Text, Thumbnail} from '@shopify/polaris';
import {CheckSmallIcon} from '@shopify/polaris-icons';
import {formatDate} from '../../helpers/utils/formatFullTime';

const ProductItem = ({
  id = 1,
  country = 'Viet Nam',
  productImage = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg',
  createdAt = '2024-05-27T23:08:33-04:00',
  productName = 'Sport Shoes',
  timeAgo = '1 hour ago',
  firstName = 'Abcs',
  lastName = 'Nguyen'
}) => {
  return (
    <ResourceItem id={id.toString()} media={<Thumbnail source={productImage} alt="" />}>
      <InlineStack align="space-between" blockAlign="start">
        <BlockStack>
          <Text as={'p'}>
            {`${firstName} ${lastName}`} in {country}
          </Text>
          <Text as="strong" variant="headingSm">
            Purchased {productName}
          </Text>
          <InlineStack gap="200">
            <Text as={'p'}>{timeAgo}</Text>
            <InlineStack>
              <Icon source={CheckSmallIcon} tone="info" />
              <Link removeUnderline>by AVADA</Link>
            </InlineStack>
          </InlineStack>
        </BlockStack>
        <Text as={'p'} tone="base">
          From: {formatDate(createdAt)}
        </Text>
      </InlineStack>
    </ResourceItem>
  );
};

ProductItem.propTypes = {
  id: PropTypes.number,
  country: PropTypes.string,
  productImage: PropTypes.string,
  createdAt: PropTypes.string,
  productName: PropTypes.string,
  timeAgo: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string
};
ProductItem.displayName = 'ProductItem';

export default ProductItem;
