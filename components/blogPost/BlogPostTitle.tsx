import * as React from 'react';

import styles from './style.css';
import { observer } from 'mobx-react-lite';
import { EditorStore } from '../../stores/EditorStore';
import { AuthStore } from '../../stores/AuthStore';

interface BlogPostTitleProps {
  title: string;
  subTitle?: string;
  isHiddenBtn?: boolean;
}

function edit() {
  const [, collection, doc] = location.pathname.split('/');

  location.href = `/editor/${collection}/${doc}`;
}

async function del() {
  const isOK = confirm('삭제하시겠습니까?');

  if (isOK) {
    const [, collection, doc] = location.pathname.split('/');
    await EditorStore.delete(collection, doc);

    return;
  }

  return;
}

const BlogPostTitle: React.FC<BlogPostTitleProps> = ({ title, subTitle, isHiddenBtn }) => {
  const authStore = React.useContext(AuthStore);

  return (
    <div className={styles.titleBox}>
      {isHiddenBtn ||
        (authStore.IsAdmin && (
          <div className={styles.titleBtnBox}>
            <button onClick={edit}>edit</button>
            <button onClick={del}>delete</button>
          </div>
        ))}
      <span className={styles.mainTitle}>{title}</span>
      {subTitle && <span className={styles.subTitle}>{' - ' + subTitle}</span>}
    </div>
  );
};

export default observer(BlogPostTitle);
