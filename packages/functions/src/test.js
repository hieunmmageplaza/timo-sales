const Shopify = require('shopify-api-node');

(async () => {
  const shopify = new Shopify({
    accessToken: 'shpua_127ebd3cfba8b59f30366a567dbab5d4',
    shopName: 'hieutimonew.myshopify.com',
    apiVersion: '2024-10'
  });
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

  const orders = await shopify.graphql(query);
  // const test = await shopify.order.list({
  //   limit: 10,
  //   status: 'any'
  // });
  console.log('🎅🎅🎅okk');
})();
