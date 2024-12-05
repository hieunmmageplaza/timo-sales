import {getShopByField} from '@functions/repositories/shopRepository';
import {initShopify} from '@functions/services/shopify/shopifyService';
import {handleGetProductGraphQL} from '@functions/services/shopify/graphqlService';
import {createNewNotification} from '@functions/repositories/notificationsRepository';

export async function createNotification(ctx) {
  const domain = await ctx.get('X-Shopify-Shop-Domain');
  const orderData = ctx.req.body;
  console.log('🎅🎅🎅 createNotification', orderData);
  const shopData = await getShopByField(domain);
  const shopify = initShopify(shopData);
  const productId = orderData.line_items[0].product_id;
  const {shipping_address: shippingAddress, created_at} = shopData;
  const {firstName, lastName, city, country} = shippingAddress;

  const {imageUrl} = await handleGetProductGraphQL({shopify, productId});
  const notification = {
    firstName,
    lastName,
    city,
    country,
    created_at,
    productImage: imageUrl
  };
  await createNewNotification(notification);
}
