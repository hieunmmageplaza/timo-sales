import {getShopById, getShopByShopifyDomain} from '@avada/shopify-auth';
import Shopify from 'shopify-api-node';
import {prepareShopData} from '@avada/core';
import shopifyConfig from '../config/shopify';

export async function getShopifyShop(ctx) {
  const shopDomain = ctx.state.shopify.shop;
  const {id} = await getShopByShopifyDomain(shopDomain);
  const shopData = await getShopById(id);

  const shopify = initShopify(shopData);

  return {shopify, shopData};
}

export async function getNotifications(shopify, id) {
  const orders = await shopify.order.list({status: 'any'});
  const products = await shopify.product.list({
    id: orders.map(order => order.line_items[0].product_id)
  });

  return orders.map(order => {
    return {
      firstName: order.billing_address.first_name || 'Guest',
      city: order.billing_address.city || 'Hanoi',
      country: order.billing_address.country || 'Vietnam',
      shopId: id || '',
      timestamp: order.created_at || '',
      productName: order.line_items[0].title || 'Sport T-shirt',
      productId: order.line_items[0].product_id || 111,
      productImage: products.find(p => p.id === order.line_items[0].product_id).image.src || null
    };
  });
}

export function initShopify(shopData, apiVersion = '2023-04') {
  const shopParsedData = prepareShopData(shopData.id, shopData, shopifyConfig.accessTokenKey);
  const {shopifyDomain, accessToken} = shopParsedData;
  return new Shopify({
    apiVersion,
    accessToken,
    shopName: shopifyDomain,
    autoLimit: true
  });
}
