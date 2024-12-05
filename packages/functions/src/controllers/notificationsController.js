import {
  getListNotifications,
  getNotificationsByShopId
} from '../repositories/notificationsRepository';
import {getShopByField} from '../repositories/shopRepository';

export async function getNotifications(ctx) {
  try {
    const notifications = await getListNotifications();
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

export const getDataClient = async ctx => {
  try {
    console.log('🎅🎅🎅test getDataClient ');
    const {shopifyDomain} = ctx.request.query;
    return (ctx.body = {message: 'ok ok ok'});
    const shopData = await getShopByField(shopifyDomain);

    const notifications = await getNotificationsByShopId(shopData.id);
    if (!notifications) {
      console.log('No notifications found');
    }

    ctx.body = {
      success: true,
      data: {
        notifications,
        setting: []
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
