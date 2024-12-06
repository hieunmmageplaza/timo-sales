import Router from 'koa-router';
import {createNotification} from '../controllers/webhookApi/orderController';

export default function webhookRouter() {
  const router = new Router({prefix: '/webhook'});
  router.post('/newOrder', createNotification);

  return router;
}
