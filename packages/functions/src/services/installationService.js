import {initShopSettings} from '../repositories/settingsRepository';
import {getShopifyShop} from '../services/shopifyService';
import {getNotifications} from '../services/notificationServices';
import {initShopNotifications} from '../repositories/notificationsRepository';
import {syncMetaFieldSetting} from '@functions/services/shopifyMetafieldService';

export async function installApp(ctx) {
  console.log('================Start_install_app================');
  try {
    const {shopify, shopData} = await getShopifyShop(ctx);
    const notifications = await getNotifications(shopify, shopData.id);
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
