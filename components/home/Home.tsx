import * as React from 'react';

import styles from './style.css';
import dynamic from 'next/dynamic';
import { MenuStore } from '../../stores/MenuStore';
import { observer } from 'mobx-react-lite';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

function moveBlogRepasitory(e: React.MouseEvent<HTMLImageElement, MouseEvent>) {
  e.preventDefault();
  window.open('https://github.com/ddojung/ddojung-blog');
}

const Home: React.SFC = () => {
  const editor = (() => {
    if (MenuStore.Editable) {
      return <ReactQuill theme="snow" />;
    }

    return <></>;
  })();

  return (
    <>
      <div className={styles.welcomeTextBox}>
        <span>What Is This Blog?</span>
        <span className={styles.subTitle}> ddojung blog</span>
      </div>
      <div className={styles.descriptionBox}>
        <p>먹을 걸 좋아하는 주니어 개발자의 개발공부 블로그</p>
        히스토리는 github ☞
        <img
          className={styles.documentImg}
          src="/static/media/github-logo-silhouette-in-a-square.svg"
          onClick={moveBlogRepasitory}
        />
      </div>
      {editor}
    </>
  );
};

export default observer(Home);
