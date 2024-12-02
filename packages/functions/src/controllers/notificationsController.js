import {getListNotifications} from '../repositories/notificationsRepository';

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
