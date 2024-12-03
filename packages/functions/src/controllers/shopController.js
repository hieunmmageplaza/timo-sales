import {getCurrentShop} from '../helpers/auth';
import {getShopInfoByShopId} from '../repositories/shopInfoRepository';
import {getShopById} from '../repositories/shopRepository';

/**
 * @param ctx
 * @returns {Promise<{shop, shopInfo: *}>}
 */
export async function getUserShops(ctx) {
  const shopId = getCurrentShop(ctx);
  const [shop, shopInfo] = await Promise.all([getShopById(shopId), getShopInfoByShopId(shopId)]);
  ctx.body = {shop, shopInfo};
}
