import {getShopByField} from '@functions/repositories/shopRepository';
import {initShopify} from '@functions/services/shopify/shopifyService';
import {handleGetProductGraphQL} from '@functions/services/shopify/graphqlService';
import {createNewNotification} from '@functions/repositories/notificationsRepository';

/**
 * Add the new notification for new order
 *
 * @param  ctx
 * @returns {Promise<Object>}
 */
export async function createNotification(ctx) {
  try {
    console.log('===> createNotification function');
    const domain = await ctx.get('X-Shopify-Shop-Domain');
    const orderData = ctx.req.body;
    const shopData = await getShopByField(domain);
    const shopify = initShopify(shopData);
    const productId = orderData.line_items[0].product_id;
    const {shipping_address: shippingAddress, created_at} = orderData;
    const {first_name = '', last_name = '', city, country} = shippingAddress;
    const {imageUrl} = await handleGetProductGraphQL({shopify, productId});
    const notification = {
      firstName: first_name,
      lastName: last_name,
      city,
      country,
      created_at,
      productImage: imageUrl,
      shopId: shopData.id
    };

    await createNewNotification(notification);
    console.log('===> createNotification function DONE');
    ctx.body = {
      success: true
    };
  } catch (e) {
    ctx.body = {
      success: false,
      error: e.message
    };
  }
}
