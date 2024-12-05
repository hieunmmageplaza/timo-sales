import {getCurrentShop} from '../helpers/auth';
import {getSettingsByShopId, updateSettingsByShopId} from '../repositories/settingsRepository';
import {syncMetaFieldSetting} from '@functions/services/shopify/shopifyMetaFieldService';
import {getShopById} from '@functions/repositories/shopRepository';

/**
 * Gets the settings for the shop.
 *
 * @param  ctx
 * @returns {Promise<Object>}
 */
export async function getSettings(ctx) {
  try {
    const shopID = getCurrentShop(ctx);
    const settings = await getSettingsByShopId(shopID);

    ctx.body = {
      success: true,
      data: settings
    };
  } catch (error) {
    console.error('Error getting settings', error);
    ctx.body = {
      success: false,
      error: error.message
    };
  }
}

/**
 * Update the settings for the shop and update settings to the metafield
 *
 * @param  ctx
 * @returns {Promise<Object>}
 */
export async function updatedSettings(ctx) {
  try {
    const shopID = getCurrentShop(ctx);
    const {data} = ctx.req.body;
    const shopData = await getShopById(shopID);
    await Promise.all([
      updateSettingsByShopId(shopID, data),
      syncMetaFieldSetting({shopData, data})
    ]);

    ctx.body = {
      success: true
    };
  } catch (error) {
    console.error('Error updating settings', error);
    ctx.body = {
      success: false,
      error: error.message
    };
  }
}
