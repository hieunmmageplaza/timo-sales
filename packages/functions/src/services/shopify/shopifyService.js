import Shopify from 'shopify-api-node';
import {getShopByField} from '@functions/repositories/shopRepository';

export const API_VERSION = '2023-04';

/**
 * @param ctx
 * @returns {shopify: object, shopData: object}
 */
export async function getShopifyShop(ctx) {
  const shopDomain = ctx.state.shopify.shop;
  const shopData = await getShopByField(shopDomain);
  const shopify = initShopify(shopData);

  return {shopify, shopData};
}

/**
 * @param shopData
 * @param apiVersion
 * @returns {Shopify}
 */
export function initShopify(shopData, apiVersion = API_VERSION) {
  const {shopifyDomain, accessToken} = shopData;
  return new Shopify({
    apiVersion,
    accessToken,
    shopName: shopifyDomain,
    autoLimit: true
  });
}
