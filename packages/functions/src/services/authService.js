import appConfig from '@functions/config/app';
import {initShopify} from '@functions/services/shopify/shopifyService';
import {getShopByField} from '@functions/repositories/shopRepository';

/**
 * @param ctx
 * @returns {Promise<void>}
 */
export async function afterLogin(ctx) {
  const shopifyDomain = ctx.state.shopify.shop;
  const shopData = await getShopByField(shopifyDomain);
  if (appConfig.baseUrl.includes('trycloudflare')) {
    const shopify = initShopify(shopData);
    await registerWebhook(shopify);
  }
}

/**
 * @param shopify
 * @returns {Promise<void>}
 */
async function registerWebhook(shopify) {
  try {
    const webhookAddress = `https://${appConfig.baseUrl}/webhook/newOrder`;
    const currentWebhooks = await shopify.webhook.list();
    const unusedWebhooks = currentWebhooks.filter(
      webhook => !webhook.address.includes(appConfig.baseUrl)
    );
    if (unusedWebhooks.length) {
      await Promise.all(unusedWebhooks.map(webhook => shopify.webhook.delete(webhook.id)));
    }
    const existingWebhook = currentWebhooks.find(webhook => webhook.address === webhookAddress);
    if (!existingWebhook) {
      return await shopify.webhook.create({
        address: webhookAddress,
        topic: 'orders/create',
        format: 'json'
      });
    }
  } catch (error) {
    console.error('Error registering webhook:', error);
    throw error;
  }
}
