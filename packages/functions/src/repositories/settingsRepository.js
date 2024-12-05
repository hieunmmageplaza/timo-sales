import {Firestore} from '@google-cloud/firestore';
import {DEFAULT_SETTINGS_CONFIG} from '../const/config';
import {presentDataAndFormatDate} from '@avada/firestore-utils';

const firestore = new Firestore();
const settingsRef = firestore.collection('settings');

/**
 * Get settings of shop by given shop ID.
 *
 * @param {string} shopId
 * @return {Promise<FirebaseFirestore.DocumentData>}
 */
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

/**
 * Updates the settings for a given shop by its document ID
 *
 * @param {string} shopId
 * @param {object} data
 * @return {Promise<FirebaseFirestore.DocumentData>}
 */
export const updateSettingsByShopId = async (shopId, data) => {
  const {id: docId, ...postData} = data;
  return settingsRef.doc(docId).update({
    ...postData
  });
};

/**
 * Initializes and saves settings of shop by given shop ID.
 *
 * @param {string} shopId
 * @returns {Promise<DocumentReference>}
 */
export const initShopSettings = async shopId => {
  await settingsRef.doc().set({...DEFAULT_SETTINGS_CONFIG, shopId, createdAt: new Date()});
};

/**
 * Deletes all settings by given shop ID when uninstall app.
 *
 * @param {string} shopId
 * @return {Promise<>}
 */
export const deleteShopSettingsByShopId = async shopId => {
  return await settingsRef
    .where('shopId', '==', shopId)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(function(doc) {
        doc.ref.delete();
      });
    });
};
