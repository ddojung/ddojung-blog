import * as React from 'react';

import Container from '../components/common/Container';
import Home from '../components/home/Home';
import { NextFC } from 'next';
import { IMenuTitle } from '../models/interface/IMenuTitle';
import { MenuStore } from '../stores/MenuStore';
import { observer } from 'mobx-react-lite';
import { BlogPost } from '../models/BlogPost';

const IndexPage: NextFC<IMenuTitle> = ({ title }) => {
  MenuStore.MenuTitle = title;

  return (
    <Container title="Welcome" contentTitle="What_Is_This_Blog.question">
      <Home />
    </Container>
  );
};

IndexPage.getInitialProps = async () => {
  return await BlogPost.getPosts();
};

export default observer(IndexPage);
