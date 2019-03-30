import * as React from 'react';

import Container from '../../components/common/Container';
import Editor from '../../components/common/Editor/Editor';
import { BlogPost } from '../../models/BlogPost';
import { IMenuTitle } from '../../models/interface/IMenuTitle';
import { MenuStore } from '../../stores/MenuStore';
import { NextFC } from 'next';

const EditorPage: NextFC<IMenuTitle> = ({ title }) => {
  MenuStore.MenuTitle = title;

  return (
    <Container title="Editor" contentTitle="Blog Editor.post">
      <Editor />
    </Container>
  );
};

EditorPage.getInitialProps = async () => {
  return await BlogPost.getPosts();
};

export default EditorPage;
