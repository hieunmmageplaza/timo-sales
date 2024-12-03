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
  const query = `{
    orders(first: 5) {
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
              image {
                url
              }
            }
          }
        }
      }
    }
  }`;

  try {
    const result = await shopify.graphql(query);
    return result.data.orders.edges.map(edge => {
      const order = edge.node;
      const imageUrl = order.lineItems.nodes[0]?.image?.url || null;

      return {
        orderId: order.id,
        createdAt: order.createdAt,
        firstName: order.shippingAddress.firstName,
        lastName: order.shippingAddress.lastName,
        city: order.shippingAddress.city,
        country: order.shippingAddress.country,
        imageUrl: imageUrl
      };
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}

export async function handleGetProductsGraphQL({
  shopify,
  ids = ['gid://shopify/Product/8123494138031', 'gid://shopify/Product/8123494138031']
}) {
  const graphqlQuery = `
    query ($ids: [ID!]!) {
      nodes(ids: $ids) {
        ... on Product {
          id
          featuredMedia {
            preview {
              image {
                url
              }
            }
          }
        }
      }
    }
  `;
  const variables = {ids};
  try {
    const result = await shopify.graphql(graphqlQuery, variables);

    return result.data.nodes.map(item => {
      return {
        productId: item.id,
        imageUrl: item.featuredMedia?.preview?.image?.url || null
      };
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}
