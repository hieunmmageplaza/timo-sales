import {setupSettings} from '@functions/repositories/settingsRepository';
import {syncOrders} from '@functions/repositories/shopInfoRepository';
import {getShopifyShop} from '../services/shopifyService';

export async function installApp(ctx) {
  console.log('================installApp================');
  try {
    const {shopify, shopData} = await getShopifyShop(ctx);
    const {id: shopId} = shopData;
    await Promise.all([syncOrders(shopify, shopId), setupSettings(shopId)]);
    console.log('================End - installApp================');
  } catch (error) {
    console.log(error);
  }
}
