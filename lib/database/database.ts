import { database } from '../../firebase/firebase';
import { IMenuTitleElement } from '../../models/interface/IMenuTitle';

export async function setPost<T>(collection: string, doc: string, data: T) {
  const result = await database
    .collection(collection)
    .doc(doc)
    .set(data, { merge: true })
    .then(() => true)
    .catch(err => {
      console.error(err);
      return false;
    });

  return result;
}

export async function getPost<T>(collection: string, doc: string): Promise<T | Error> {
  const result = await database
    .collection(collection)
    .doc(doc)
    .get()
    .then(doc => {
      if (doc.exists) {
        return doc.data() as T;
      }
      return new Error('Data is not exist');
    })
    .catch(err => {
      console.log(err);
      return new Error('Data Get Fail');
    });

  return result;
}

export async function getPostTitle(collection: string): Promise<IMenuTitleElement[] | Error> {
  const result = await database
    .collection(collection)
    .get()
    .then(collection => {
      if (collection.empty) {
        return [];
      }

      const datas = collection.docs.map(doc => {
        return {
          id: doc.data().id,
          title: doc.data().title,
        } as IMenuTitleElement;
      });

      return datas;
    })
    .catch(err => {
      console.log(err);
      return new Error('Data Get Fail');
    });

  return result;
}

export { database };
