import {Firestore} from '@google-cloud/firestore';
import {presentDataAndFormatDate} from '@avada/firestore-utils';
import presentShop from '@functions/presenters/shopPresenter';

const firestore = new Firestore();
/** @type CollectionReference */
const collection = firestore.collection('shops');

/**
 * @param id
 * @returns {Promise<{Shop}>}
 */
export async function getShopById(id) {
  const doc = await collection.doc(id).get();
  return presentDataAndFormatDate(doc, presentShop);
}

export async function getShopByField(value, field = 'shopifyDomain') {
  const docs = await collection
    .where(field, '==', value)
    .limit(1)
    .get();

  if (docs.docs.length === 0) {
    return null;
  }

  const doc = docs.docs[0];
  return {id: doc.id, ...doc.data()};
}
