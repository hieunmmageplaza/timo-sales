import {initShopSettings} from '@functions/repositories/settingsRepository';
import {handleGetOrdersGraphQL} from '@functions/services/shopify/graphqlService';
import {getShopifyShop, initShopify} from '@functions/services/shopify/shopifyService';
import {initShopNotifications} from '@functions/repositories/notificationsRepository';
import {syncMetaFieldSetting} from '@functions/services/shopify/shopifyMetaFieldService';
import {getCurrentUser} from '@functions/helpers/auth';
import {getShopByField} from '@functions/repositories/shopRepository';
import appConfig from '@functions/config/app';

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

export async function testApp(ctx) {
  // const {shopify, shopData} = await getShopifyShop(ctx);
  const {shopifyDomain} = getCurrentUser(ctx);
  const shopData = await getShopByField(shopifyDomain);
  const shopify = initShopify(shopData);
  // await shopify.webhook.create({
  //   address: `https://${appConfig.baseUrl}/webhook/newOrder`,
  //   topic: 'orders/create',
  //   format: 'json'
  // });
  const webhook = await shopify.webhook.list();
  console.log('🎅🎅🎅', webhook);
}
