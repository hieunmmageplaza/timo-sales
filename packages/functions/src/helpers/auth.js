import {formatDateFields} from '@avada/firestore-utils';

/**
 * Get current shop id from Koa context
 * Shop ID was set from authentication step in Shopify login
 *
 * @param {object} ctx
 * @return {string}
 */
export function getCurrentShop(ctx) {
  return getCurrentUser(ctx).shopID;
}

/**
 * Get current user from Koa context
 *
 * @param ctx
 * @returns {IUserContext}
 */
export function getCurrentUser(ctx) {
  return ctx.state.user;
}

/**
 *
 * @param ctx
 * @returns {any|null}
 */
export function getCurrentShopData(ctx) {
  const shopData = ctx.state.user.shopData;
  if (!shopData) {
    return null;
  }

  return formatDateFields(ctx.state.user.shopData);
}
