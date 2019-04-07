import * as uuid from 'uuid';

import { EN_MENU_TYPE } from '../models/enum/EN_MENU_TYPE';
import autobind from 'autobind-decorator';
import { db } from '../lib/database';
import { IBlogPostData } from '../models/interface/IBlogPostData';

class EditorStoreType {
  public type: EN_MENU_TYPE = EN_MENU_TYPE.PROGRAMMING;
  public title: string = '';
  public subTitle: string = '';
  public quillHtml: string = '';

  @autobind
  async post() {
    const type = this.type.toLowerCase();
    const [random] = uuid.v4().split('-');
    const id = this.title.trim().replace(/\s/g, '-') + '-' + random;
    const setResult = await db.setPost<IBlogPostData>(type, id, {
      id,
      title: this.title.trim(),
      subTitle: this.subTitle.trim(),
      contents: this.quillHtml,
    });

    if (setResult) {
      location.href = '/';
    }

    return;
  }

  @autobind
  async edit() {
    const type = this.type.toLowerCase();
    const [random] = uuid.v4().split('-');
    const id = this.title.trim().replace(/\s/g, '-') + '-' + random;

    const [, , delType, delID] = location.pathname.split('/');

    const delResult = await db.delPost(delType, delID);

    if (delResult) {
      const setResult = await db.setPost<IBlogPostData>(type, id, {
        id,
        title: this.title.trim(),
        subTitle: this.subTitle.trim(),
        contents: this.quillHtml,
      });

      if (setResult) {
        location.href = '/';
      }
    }

    return;
  }

  @autobind
  async delete(collenction: string, doc: string) {
    const setResult = await db.delPost(collenction, doc);

    if (setResult) {
      location.href = '/';
    }

    return;
  }
}

export const EditorStore = new EditorStoreType();
