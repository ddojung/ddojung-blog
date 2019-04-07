import React from 'react';

import { NextFC, NextContext } from 'next';
import Container from '../../components/common/Container';
import { BlogPost } from '../../models/BlogPost';
import { IMenuTitle } from '../../models/interface/IMenuTitle';
import { MenuStore } from '../../stores/MenuStore';
import { IBlogPostData } from '../../models/interface/IBlogPostData';
import BlogPostTitle from '../../components/blogPost/BlogPostTitle';
import BlogPostContent from '../../components/blogPost/BlogPostContent';
import { EN_MENU_TYPE } from '../../models/enum/EN_MENU_TYPE';

interface IContentPageProps {
  menu: IMenuTitle | null;
  content: IBlogPostData | null;
  extension: string;
}

const ContentPage: NextFC<IContentPageProps> = ({ menu, content, extension }) => {
  if (!menu) {
    return <></>;
  }

  MenuStore.MenuTitle = menu && menu.title;

  const filename = content ? content.title.replace(/\s/g, '_') + extension : undefined;
  const title = content ? content.title : undefined;
  const subTitle = content ? content.subTitle : undefined;
  const contents = content ? content.contents : '';

  return (
    <Container title={title} contentTitle={filename}>
      <BlogPostTitle title={title || ''} subTitle={subTitle} />
      <BlogPostContent>
        <section
          ref={el => {
            if (el) {
              el.innerHTML = contents;
            }
          }}
        />
      </BlogPostContent>
    </Container>
  );
};

ContentPage.getInitialProps = async (ctx: NextContext) => {
  const { req } = ctx;

  if (!req || !req.url) {
    return {
      menu: null,
      content: null,
      extension: '',
    };
  }

  console.log(req.url.split('/'));

  const [, collection, doc] = req.url.split('/');

  console.log(collection, doc);

  if (!collection || !doc) {
    return {
      menu: null,
      content: null,
      extension: '',
    };
  }

  const extension = (() => {
    if (collection === EN_MENU_TYPE.PROGRAMMING.toLowerCase()) {
      return '.tech';
    }

    if (collection === EN_MENU_TYPE.FOOD.toLowerCase()) {
      return '.food';
    }

    return '.chat';
  })();

  const menu = await (async () => {
    if (process.browser) {
      return await BlogPost.getPosts();
    }

    return await BlogPost.getPostsUsingREST();
  })();

  const content = await (async () => {
    if (process.browser) {
      return await BlogPost.getPost(collection, doc as string);
    }

    return await BlogPost.getPostUsingREST(collection, doc as string);
  })();

  return {
    menu,
    content,
    extension,
  };
};

export default ContentPage;
