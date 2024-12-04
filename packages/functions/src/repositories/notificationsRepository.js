import {Firestore} from '@google-cloud/firestore';
import moment from 'moment';

const firestore = new Firestore();
const notificationRef = firestore.collection('notifications');

export const getNotificationsByShopId = async shopId => {
  try {
    const docs = await notificationRef.where('shopId', '==', shopId).get();
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

export const getListNotifications = async () => {
  try {
    const docs = await notificationRef.orderBy('createdAt', 'desc').get();
    if (docs.empty) {
      return null;
    }

    return docs.docs.map(doc => ({
      id: doc.id,
      timeAgo: moment(doc.data().createdAt).fromNow(),
      ...doc.data()
    }));
  } catch (error) {
    console.log('Error in getAllNotifications (notificationsRepository.js)', error.message);
    return null;
  }
};

export const initShopNotifications = async data => {
  const batch = firestore.batch();
  try {
    data.map(item => {
      const docRef = notificationRef.doc();
      batch.set(docRef, item);
    });
    await batch.commit();
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteShopNotificationByShopId = async shopId => {
  try {
    await notificationRef
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

export async function createNewNotification(data) {
  try {
    await notificationRef.doc().set(data);
    return {success: true};
  } catch (e) {
    console.log(e);
    return {success: false, error: e.message};
  }
}
