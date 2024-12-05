import {Firestore} from '@google-cloud/firestore';
import moment from 'moment';

const firestore = new Firestore();
const notificationRef = firestore.collection('notifications');

/**
 * Get list notification of shop by given shop ID
 *
 * @param {string} shopId
 * @returns {Promise<FirebaseFirestore.DocumentData>}
 */
export const getNotificationsByShopId = async shopId => {
  try {
    const docs = await notificationRef
      .where('shopId', '==', shopId)
      .orderBy('createdAt', 'desc')
      .get();
    if (docs.empty) {
      return null;
    }

    return docs.docs.map(doc => ({
      id: doc.id,
      timeAgo: moment(doc.data().createdAt).fromNow(),
      ...doc.data()
    }));
  } catch (error) {
    console.log('Error in getNotificationsByShopId (notificationsRepository.js)', error.message);
    return null;
  }
};

/**
 * Initializes and saves a list of notifications to Firestore for a shop.
 * @param {array} data
 * @returns {Promise<FirebaseFirestore.DocumentReference>}
 */
export const initShopNotifications = async data => {
  const batch = firestore.batch();
  try {
    data.map(item => {
      const docRef = notificationRef.doc();
      batch.set(docRef, item);
    });
    await batch.commit();
  } catch (error) {
    console.log(error);
    return null;
  }
};

/**
 * Deletes all notifications for a given shop ID when uninstall app..
 * @param {string} shopId
 * @returns {Promise<>}
 */
export const deleteShopNotificationByShopId = async shopId => {
  await notificationRef
    .where('shopId', '==', shopId)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(function(doc) {
        doc.ref.delete();
      });
    });
};

/**
 * Creates a new notification when have new order.
 * @param {string} data
 * @returns {Promise<FirebaseFirestore.DocumentReference>}
 */
export async function createNewNotification(data) {
  await notificationRef.doc().set(data);
}
