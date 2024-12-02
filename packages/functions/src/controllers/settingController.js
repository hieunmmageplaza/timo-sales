import {getShopifyShop} from '@functions/services/shopifyService';

export async function updateSettings(ctx) {
  console.log('🎅🎅🎅test213');
  const {shopify, shopData} = await getShopifyShop(ctx);
  console.log('🎅🎅🎅', shopify);
  return (ctx.body = {error: 'Something went wrong!'});
}
