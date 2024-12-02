import {Firestore} from '@google-cloud/firestore';
import {DEFAULT_SETTINGS_CONFIG} from '@functions/const/config';
import {presentDataAndFormatDate} from '@avada/firestore-utils';
const firestore = new Firestore();
const settingsRef = firestore.collection('settings');

export const getSettingsByShopId = async shopId => {
  const docs = await settingsRef
    .where('shopId', '==', shopId)
    .limit(1)
    .get();

  if (docs.empty) {
    return null;
  }

  const [doc] = docs.docs;

  return presentDataAndFormatDate(doc);
};

export const updateSettingsByShopId = async (shopId, data) => {
  const settings = await getSettingsByShopId(shopId);

  if (!settings) {
    return settingsRef.add(data);
  }

  return settingsRef.doc(settings.id).update({
    ...data,
    updatedAt: new Date()
  });
};

export const setupSettings = async shopId => {
  try {
    const doc = settingsRef.doc();
    await doc.set({...DEFAULT_SETTINGS_CONFIG, shopId, createdAt: new Date()});
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
};
