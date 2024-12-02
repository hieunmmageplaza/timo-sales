import {getCurrentShop} from '../helpers/auth';
import {getSettingsByShopId, updateSettingsByShopId} from '../repositories/settingsRepository';

export async function getSettings(ctx) {
  try {
    const {shopID} = getCurrentShop(ctx);
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
    const {shopID} = getCurrentShop(ctx);
    const body = ctx.req.body;

    const settings = await updateSettingsByShopId(shopID, body);

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
