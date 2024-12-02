import {initShopSettings} from '../repositories/settingsRepository';
import {getShopifyShop} from '../services/shopifyService';
import {getNotifications} from '../services/notificationServices';
import {initShopNotifications} from '../repositories/notificationsRepository';

export async function installApp(ctx) {
  console.log('================Start_install_app================');
  try {
    const {shopify, shopData} = await getShopifyShop(ctx);
    const notifications = getNotifications(shopify, shopData.id);
    await Promise.all([initShopSettings(shopData.id), initShopNotifications(notifications)]);
    console.log('================End================');
  } catch (error) {
    console.log(error);
  }
}
