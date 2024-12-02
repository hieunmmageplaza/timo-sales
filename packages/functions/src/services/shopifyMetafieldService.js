import {initShopify} from '../services/shopifyService';
import {isEmpty} from '@avada/utils';

export const META_FIELD_NAMESPACE = 'timo-sales-pop';
export const META_FIELD_KEY = 'shopSetting';

export async function syncMetaFieldSetting(
  shopId,
  data,
  namespace = META_FIELD_NAMESPACE,
  key = META_FIELD_KEY
) {
  try {
    const shopify = initShopify(shopId);
    const metafieldOwner = {namespace, key};
    const metafields = await shopify.metafield.list(metafieldOwner);
    const metafieldData = {value: JSON.stringify(data), type: 'json'};
    if (isEmpty(metafields)) {
      console.log('Create meta field');
      await shopify.metafield.create({...metafieldOwner, ...metafieldData});
      return;
    }
    console.log('Update meta field');
    await Promise.all(metafields.map(({id}) => shopify.metafield.update(id, metafieldData)));
  } catch (error) {
    console.log(error);
  }
}
