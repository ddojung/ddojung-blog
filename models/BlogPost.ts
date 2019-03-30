import { db } from '../lib/database';
import { EN_MENU_TYPE } from './enum/EN_MENU_TYPE';
import { IMenuTitle } from './interface/IMenuTitle';
import { IBlogPostData } from './interface/IBlogPostData';

export class BlogPost {
  static async getPosts(): Promise<IMenuTitle> {
    const getProgramming = await db.getPostTitle(EN_MENU_TYPE.PROGRAMMING.toLowerCase());
    const getFood = await db.getPostTitle(EN_MENU_TYPE.FOOD.toLowerCase());
    const getChat = await db.getPostTitle(EN_MENU_TYPE.CHAT.toLowerCase());

    if (getProgramming instanceof Error || getFood instanceof Error || getChat instanceof Error) {
      return { title: null };
    }

    return { title: { programming: getProgramming, food: getFood, chat: getChat } };
  }

  static async getPost(type: string, id: string): Promise<IBlogPostData | null> {
    const getContent = await db.getPost<IBlogPostData>(type, id);

    if (getContent instanceof Error) {
      return null;
    }

    return getContent;
  }
}
