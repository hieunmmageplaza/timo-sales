import clientApiRouter from '@functions/routes/clientApi';
import App from 'koa';
const cors = require('@koa/cors');
import * as errorService from '@functions/services/errorService';

const clientApi = new App();
clientApi.proxy = true;

// clientApi.use(cors());
const router = clientApiRouter();
clientApi.use(router.allowedMethods());
clientApi.use(router.routes());

clientApi.on('error', errorService.handleError);

export default clientApi;
