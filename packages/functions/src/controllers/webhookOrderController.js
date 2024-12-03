import {getShopByField} from '../repositories/shopRepository';
import {initShopify} from '../services/shopifyService';
import {getNewNotification, createNewNotification} from '../repositories/notificationsRepository';

export async function createNotification(ctx) {
  const domain = await ctx.get('X-Shopify-Shop-Domain');
  const orderData = ctx.req.body;
  const shopData = await getShopByField(domain);
  const shopify = initShopify(shopData);

  const notification = await getNewNotification(shopify, shopData.id, orderData);
  const {success} = await createNewNotification(notification);
  ctx.body = {success: success};
}
