import { IBlogPostData } from './IBlogPostData';

export interface IGetRESTFirestore {
  documents: IGetRESTFirestoreDocument[];
}

export interface IGetRESTFirestoreDocument {
  name: string;
  fields: IBlogPostData;
  createTime: string;
  updateTime: string;
}
