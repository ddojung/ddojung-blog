import * as React from 'react';

import styles from './style.css';
import { observer } from 'mobx-react-lite';
import BlogPostTitle from '../../components/blogPost/BlogPostTitle';
import BlogPostContent from '../../components/blogPost/BlogPostContent';

function moveBlogRepasitory(e: React.MouseEvent<HTMLImageElement, MouseEvent>) {
  e.preventDefault();
  window.open('https://github.com/ddojung/ddojung-blog');
}

const Home: React.FC = () => {
  return (
    <main>
      <BlogPostTitle title={'What is This Blog?'} subTitle={'ddojung blog'} isHiddenBtn={true} />
      <BlogPostContent>
        <p>먹을 걸 좋아하는 주니어 개발자의 개발공부 블로그</p>
        히스토리는 github ☞
        <img
          className={styles.documentImg}
          src="/static/media/github-logo-silhouette-in-a-square.svg"
          onClick={moveBlogRepasitory}
        />
      </BlogPostContent>
    </main>
  );
};

export default observer(Home);
