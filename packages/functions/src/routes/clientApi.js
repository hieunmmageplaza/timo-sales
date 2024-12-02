import Router from 'koa-router';
import {getDataClient} from '../controllers/notificationsController';

export default function clientApiRouter() {
  const router = new Router({prefix: '/clientApi'});
  router.get('/shop', getDataClient);

  return router;
}
