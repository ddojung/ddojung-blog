import { db } from '../lib/database';
import { EN_MENU_TYPE } from './enum/EN_MENU_TYPE';
import { IMenuTitle } from './interface/IMenuTitle';
import { IBlogPostData } from './interface/IBlogPostData';
import { getBlogPostTitle, getBlogPost } from '../lib/database/databaseREST';

export class BlogPost {
  static async getPostsUsingREST(): Promise<IMenuTitle> {
    const getProgramming = await getBlogPostTitle(EN_MENU_TYPE.PROGRAMMING.toLowerCase());
    const getFood = await getBlogPostTitle(EN_MENU_TYPE.FOOD.toLowerCase());
    const getChat = await getBlogPostTitle(EN_MENU_TYPE.CHAT.toLowerCase());

    if (getProgramming instanceof Error || getFood instanceof Error || getChat instanceof Error) {
      return { title: null };
    }

    return { title: { programming: getProgramming, food: getFood, chat: getChat } };
  }

  static async getPostUsingREST(type: string, id: string): Promise<IBlogPostData | null> {
    const getContent = await getBlogPost(type, id);
    if (getContent instanceof Error) {
      return null;
    }

    return getContent;
  }

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
