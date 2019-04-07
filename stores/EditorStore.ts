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
    const id = uuid.v4();
    const setResult = await db.setPost<IBlogPostData>(type, id, {
      id,
      title: this.title,
      subTitle: this.subTitle,
      contents: this.quillHtml,
    });

    if (setResult) {
      location.href = '/';
    }

    return;
  }
}

export const EditorStore = new EditorStoreType();
