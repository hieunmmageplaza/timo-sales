import Shopify from 'shopify-api-node';
import {getShopByField} from '../repositories/shopRepository';
import appConfig from '@functions/config/app';

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

export async function afterLogin(ctx) {
  const shopifyDomain = ctx.state.shopify.shop;
  const shopData = await getShopByField(shopifyDomain);
  if (appConfig.baseUrl.includes('trycloudflare')) {
    const shopify = initShopify(shopData);
    await registerWebhook(shopify);
  }
}

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
