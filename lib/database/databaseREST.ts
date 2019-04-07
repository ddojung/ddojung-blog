import axios from 'axios';
import FireStoreParser from 'firestore-parser';

import { IGetRESTFirestore, IGetRESTFirestoreDocument } from '../../models/interface/IGetRESTFirestore';
import { IMenuTitleElement } from '../../models/interface/IMenuTitle';
import { IBlogPostData } from '../../models/interface/IBlogPostData';

const base = axios.create({
  baseURL: 'https://firestore.googleapis.com/v1beta1/projects/lee-ddojung-blog/databases/(default)',
});

export function getBlogPostTitle(collection: string): Promise<IMenuTitleElement[] | Error> {
  const getCollections = base
    .get<IGetRESTFirestore>('/documents/' + collection)
    .then(resp => {
      if (!resp.data || !resp.data.documents) {
        return [];
      }

      const titleEle = resp.data.documents.map(doc => {
        return {
          id: doc.fields.id,
          title: doc.fields.title,
        };
      });

      return FireStoreParser(titleEle);
    })
    .catch(err => {
      console.log(err);
      return new Error('Exeption error');
    });

  return getCollections;
}

export function getBlogPost(collection: string, doc: string): Promise<IBlogPostData | Error> {
  const getCollections = base
    .get<IGetRESTFirestoreDocument>(`/documents/${collection}/${doc}`)
    .then(resp => {
      return FireStoreParser(resp.data.fields);
    })
    .catch(err => {
      console.log(err);
      return new Error('Exeption error');
    });

  return getCollections;
}
