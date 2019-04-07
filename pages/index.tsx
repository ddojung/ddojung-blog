import * as React from 'react';

import Container from '../components/common/Container';
import Home from '../components/home/Home';
import { NextFC } from 'next';
import { IMenuTitle } from '../models/interface/IMenuTitle';
import { MenuStore } from '../stores/MenuStore';
import { observer } from 'mobx-react-lite';
import { BlogPost } from '../models/BlogPost';
import { getBlogPost } from '../lib/database/databaseREST';

const IndexPage: NextFC<IMenuTitle> = ({ title }) => {
  MenuStore.MenuTitle = title;

  return (
    <Container title="Welcome" contentTitle="What_Is_This_Blog.question">
      <Home />
    </Container>
  );
};

IndexPage.getInitialProps = async () => {
  await getBlogPost('food', '4979b6d9-0af1-4a5f-a8d6-ac5abe4d9c9c');
  if (process.browser) {
    return await BlogPost.getPosts();
  }

  return await BlogPost.getPostsUsingREST();
};

export default observer(IndexPage);
