import * as shopRepository from '../repositories/shopRepository';
import {deleteShopNotificationByShopId} from '../repositories/notificationsRepository';
import {deleteShopSettingsByShopId} from '../repositories/settingsRepository';

export async function uninstallApp(ctx) {
  console.log('================Start_uninstall_app================');
  try {
    const domain = ctx.get('X-Shopify-Shop-Domain');
    const shop = await shopRepository.getShopByField(domain);
    await Promise.all([
      deleteShopNotificationByShopId(shop?.id),
      deleteShopSettingsByShopId(shop?.id)
      // deleteMetaField(shopify)
    ]);
    console.log('================End================');
  } catch (error) {
    console.log(error);
  }
}
