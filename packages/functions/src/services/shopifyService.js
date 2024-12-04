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
    const {orders} = await shopify.graphql(query);
    return orders.edges.map(({node: {id, createdAt, shippingAddress, lineItems}}) => {
      const imageUrl = lineItems.nodes?.[0]?.image?.url || null;
      const {firstName, lastName, city, country} = shippingAddress;
      return {orderId: id, createdAt, firstName, lastName, city, country, productImage: imageUrl};
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}

export async function handleGetProductGraphQL({shopify, productId = '8123494138031'}) {
  const graphqlQuery = `query ($id: ID!) {
  product(id: $id) {
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
`;
  try {
    const {product = {}} = await shopify.graphql(graphqlQuery, {
      id: `gid://shopify/Product/${productId}`
    });
    return {
      productId: product?.id,
      imageUrl: product?.featuredMedia?.preview?.image?.url || null
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}
