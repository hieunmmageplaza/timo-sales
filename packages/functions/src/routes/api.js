import Router from 'koa-router';
import * as shopController from '../controllers/shopController';
import * as settingController from '../controllers/settingController';
import * as notificationsController from '../controllers/notificationsController';
import {getApiPrefix} from '../const/app';
import {installApp} from '../services/installationService';

export default function apiRouter(isEmbed = false) {
  const router = new Router({prefix: getApiPrefix(isEmbed)});

  router.get('/shops', shopController.getUserShops);
  router.get('/settings', settingController.getSettings);
  router.put('/settings', settingController.updatedSettings);
  router.get('/notifications', notificationsController.getNotifications);
  router.put('/test', installApp);

  return router;
}
