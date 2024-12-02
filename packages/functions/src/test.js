import Shopify from 'shopify-api-node';

(async () => {
  const shopify = new Shopify({
    accessToken: 'shpua_127ebd3cfba8b59f30366a567dbab5d4',
    shopName: 'hieutimonew.myshopify.com'
  });

  console.log('🎅🎅🎅', shopify);
})();
