import * as React from 'react';

import Container from '../../components/common/Container';
import Editor from '../../components/common/Editor/Editor';
import { BlogPost } from '../../models/BlogPost';
import { IMenuTitle } from '../../models/interface/IMenuTitle';
import { MenuStore } from '../../stores/MenuStore';
import { NextFC } from 'next';
import { AuthStore } from '../../stores/AuthStore';
import { observer } from 'mobx-react-lite';
import { IBlogPostData } from '../../models/interface/IBlogPostData';
import { EN_MENU_TYPE } from '../../models/enum/EN_MENU_TYPE';

interface IEditorPageProps {
  menu: IMenuTitle | null;
  editData: IBlogPostData | null;
  type: EN_MENU_TYPE;
}

const EditorPage: NextFC<IEditorPageProps> = ({ menu, editData, type }) => {
  const authStore = React.useContext(AuthStore);
  const displayMessage = {
    title: authStore.IsAdmin ? 'Editor' : 'Not Authorized',
    contentTitle: authStore.IsAdmin ? 'Blog_Editor.post' : 'Not_Authorized',
  };

  MenuStore.MenuTitle = menu && menu.title;

  return (
    <Container title={displayMessage.title} contentTitle={displayMessage.contentTitle}>
      {authStore.IsAdmin && <Editor editData={editData} type={type} />}
    </Container>
  );
};

EditorPage.getInitialProps = async ({ req }) => {
  if (!req || !req.url) {
    return {
      menu: null,
      editData: null,
      type: EN_MENU_TYPE.PROGRAMMING,
    };
  }

  const [, , collection, doc] = req.url.split('/');

  const editData = await (async () => {
    if (!collection || !doc) {
      return null;
    }

    return process.browser ? await BlogPost.getPost(collection, doc) : await BlogPost.getPostUsingREST(collection, doc);
  })();

  const type = (() => {
    if (collection === EN_MENU_TYPE.PROGRAMMING.toLowerCase()) {
      return EN_MENU_TYPE.PROGRAMMING;
    }

    if (collection === EN_MENU_TYPE.FOOD.toLowerCase()) {
      return EN_MENU_TYPE.FOOD;
    }

    return EN_MENU_TYPE.CHAT;
  })();

  if (process.browser) {
    return {
      menu: await BlogPost.getPosts(),
      editData,
      type,
    };
  }

  return {
    menu: await BlogPost.getPostsUsingREST(),
    editData,
    type,
  };
};

export default observer(EditorPage);
