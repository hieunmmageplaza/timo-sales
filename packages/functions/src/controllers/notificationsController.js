import {getNotificationsByShopId} from '../repositories/notificationsRepository';
import {getShopByField} from '../repositories/shopRepository';
import {getCurrentShop} from '@functions/helpers/auth';

/**
 * @param ctx
 * @returns {Promise<{notifications: *}>}
 */
export async function getNotifications(ctx) {
  try {
    const shopID = getCurrentShop(ctx);
    const notifications = await getNotificationsByShopId(shopID);
    if (!notifications) {
      console.log('No notifications found');
    }

    ctx.body = {
      success: true,
      data: notifications
    };
  } catch (error) {
    console.log('Error in getNotifications (settingsController.js)', error.message);
    ctx.body = {
      success: false,
      error: error.message
    };
  }
}

/**
 * @param ctx
 * @returns {Promise<{notification: *}>}
 */
export const getDataClient = async ctx => {
  try {
    console.log('🎅🎅🎅test getDataClient ');
    const {shopifyDomain} = ctx.request.query;
    const shopData = await getShopByField(shopifyDomain);

    const notification = await getNotificationsByShopId(shopData.id);
    if (!notification) {
      console.log('No notifications found');
    }

    ctx.body = {
      success: true,
      data: {
        notification
      }
    };
  } catch (error) {
    console.log('Error', error.message);
    ctx.body = {
      success: false,
      error: error.message
    };
  }
};

export const test = async ctx => {
  console.log('test api');
};
