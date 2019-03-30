import React from 'react';

import { NextFC } from 'next';
import Container from '../../components/common/Container';
import { BlogPost } from '../../models/BlogPost';
import { IMenuTitle } from '../../models/interface/IMenuTitle';
import { MenuStore } from '../../stores/MenuStore';
import { IBlogPostData } from '../../models/interface/IBlogPostData';
import BlogPostTitle from '../../components/blogPost/BlogPostTitle';
import BlogPostContent from '../../components/blogPost/BlogPostContent';
import { EN_MENU_TYPE } from '../../models/enum/EN_MENU_TYPE';

interface IContentPageProps {
  menu: IMenuTitle;
  content: IBlogPostData | null;
  extension: string;
}

const ContentPage: NextFC<IContentPageProps> = ({ menu, content, extension }) => {
  MenuStore.MenuTitle = menu.title;

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

ContentPage.getInitialProps = async ({ query }) => {
  const extension = (() => {
    if (query[0] === EN_MENU_TYPE.PROGRAMMING.toLowerCase()) {
      return '.tech';
    }

    if (query[0] === EN_MENU_TYPE.FOOD.toLowerCase()) {
      return '.food';
    }

    return '.chat';
  })();

  return {
    menu: await BlogPost.getPosts(),
    content: await BlogPost.getPost(query[0] as string, query['id'] as string),
    extension,
  };
};

export default ContentPage;
