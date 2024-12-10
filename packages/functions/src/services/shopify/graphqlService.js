/**
 * @param shopify
 * @returns {Promise<Object[]>}
 */
export async function handleGetOrdersGraphQL({shopify, shopId}) {
  const query = `{
    orders(first: 30) {
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
      return {
        orderId: id,
        createdAt: new Date(createdAt),
        firstName,
        lastName,
        city,
        country,
        productImage: imageUrl,
        shopId
      };
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}

/**
 * @param shopify
 * @param productId
 * @returns {Promise<Object>}
 */
export async function handleGetProductGraphQL({shopify, productId}) {
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
