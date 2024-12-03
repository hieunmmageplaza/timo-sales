import {getCurrentShop} from '../helpers/auth';
import {getSettingsByShopId, updateSettingsByShopId} from '../repositories/settingsRepository';
import {syncMetaFieldSetting} from '@functions/services/shopifyMetafieldService';
import {getShopById} from '@functions/repositories/shopRepository';

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
export async function updatedSettings(ctx) {
  try {
    const shopID = getCurrentShop(ctx);
    const {data} = ctx.req.body;
    const shopData = await getShopById(shopID);
    const settings = await updateSettingsByShopId(shopID, data);
    await syncMetaFieldSetting({shopData, data});

    ctx.body = {
      success: true,
      data: settings
    };
  } catch (error) {
    console.error('Error updating settings', error);
    ctx.body = {
      success: false,
      error: error.message
    };
  }
}
