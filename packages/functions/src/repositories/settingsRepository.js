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
    ...data
  });
};

export const initShopSettings = async shopId => {
  try {
    const doc = settingsRef.doc();
    await doc.set({...DEFAULT_SETTINGS_CONFIG, shopId, createdAt: new Date()});
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteShopSettingsByShopId = async shopId => {
  try {
    await settingsRef
      .where('shopId', '==', shopId)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(function(doc) {
          doc.ref.delete();
        });
      });
    return {success: true};
  } catch (e) {
    return {success: false, error: e.message};
  }
};
