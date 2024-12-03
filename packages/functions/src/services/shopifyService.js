import Shopify from 'shopify-api-node';
import {getShopByField} from '../repositories/shopRepository';

export const API_VERSION = '2023-04';

export async function getShopifyShop(ctx) {
  const shopDomain = 'hieutimonew.myshopify.com';
  const shopData = await getShopByField(shopDomain);
  const shopify = initShopify(shopData);

  return {shopify, shopData};
}

export function initShopify(shopData, apiVersion = API_VERSION) {
  const {shopifyDomain, accessToken} = shopData;
  return new Shopify({
    apiVersion,
    accessToken,
    shopName: shopifyDomain,
    autoLimit: true
  });
}

export async function handleGetOrdersGraphQL({shopify}) {
  const query = `query {
  orders(first: 10) {
    edges {
      node {
        id
        createdAt
        shippingAddress {
          firstName
          lastName
          city
          country
        }
        lineItems(first: 1) {
          nodes {
            product {
              id
            }
          }
        }
      }
    }
  }
}
`;
  const orders = await shopify.graphql(query, {});
  return [];
}

export async function handleGetProductsGraphQL({shopify}) {
  return [];
}
