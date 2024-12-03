import {initShopSettings} from '../repositories/settingsRepository';
import {getShopifyShop, handleGetOrdersGraphQL} from '../services/shopifyService';
import {initShopNotifications} from '../repositories/notificationsRepository';
import {syncMetaFieldSetting} from '../services/shopifyMetafieldService';

export async function installApp(ctx) {
  console.log('================Start_install_app================');
  try {
    const {shopify, shopData} = await getShopifyShop(ctx);
    const notifications = await handleGetOrdersGraphQL({shopify});
    await Promise.all([
      initShopSettings(shopData.id),
      initShopNotifications(notifications),
      syncMetaFieldSetting({shopData})
      // shopify.webhook.create({
      //   address: 'https://localhost:3000/',
      //   topic: 'orders/create',
      //   format: 'json'
      // })
    ]);
    console.log('================End================');
  } catch (error) {
    console.log(error);
  }
}
