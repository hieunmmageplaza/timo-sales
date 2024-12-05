import {isEmpty} from '@avada/utils';
import {DEFAULT_SETTINGS_CONFIG} from '@functions/const/config';
import {initShopify} from '@functions/services/shopify/shopifyService';

export const META_FIELD_NAMESPACE = 'avada-sales-pop';
export const META_FIELD_KEY = 'shopSetting';

export async function syncMetaFieldSetting({
  shopData,
  data = DEFAULT_SETTINGS_CONFIG,
  namespace = META_FIELD_NAMESPACE,
  key = META_FIELD_KEY
}) {
  try {
    const shopify = initShopify(shopData);
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

export async function deleteMetaField(
  shopify,
  namespace = META_FIELD_NAMESPACE,
  key = META_FIELD_KEY
) {
  const metafieldOwner = {namespace, key};
  const metafields = await shopify?.metafield.list(metafieldOwner);

  if (!isEmpty(metafields)) {
    await Promise.all(metafields.map(({id}) => shopify.metafield.delete(id)));
  }
}
