import Shopify from 'shopify-api-node';
import {getShopByField} from '../repositories/shopRepository';
import shopifyConfig from '../config/shopify';
export const API_VERSION = '2023-04';

export async function getShopifyShop(ctx) {
  const shopDomain = ctx.state.shopify.shop;
  const {shopData} = await getShopByField(shopDomain);
  const shopify = initShopify(shopData);

  return {shopify, shopData};
}

export function initShopify(shopData, apiVersion = API_VERSION) {
  const shopParsedData = prepareShopData(shopData.id, shopData, shopifyConfig.accessTokenKey);
  const {shopifyDomain, accessToken} = shopParsedData;
  return new Shopify({
    apiVersion,
    accessToken,
    shopName: shopifyDomain,
    autoLimit: true
  });
}
