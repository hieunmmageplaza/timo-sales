import {Firestore} from '@google-cloud/firestore';

const firestore = new Firestore();
/** @type CollectionReference */
const shopInfosRef = firestore.collection('shopInfos');

/**
 * Get shop info by given shop ID
 *
 * @param {string} id
 * @return {Promise<FirebaseFirestore.DocumentData>}
 */
export async function getShopInfoByShopId(id) {
  const docs = await shopInfosRef
    .where('shopId', '==', id)
    .limit(1)
    .get();
  if (docs.empty) {
    return null;
  }
  const [doc] = docs.docs;
  return doc;
}

export async function syncOrders() {
  return [];
}
