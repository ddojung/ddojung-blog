import * as React from 'react';
import styles from './style.css';

function moveBlogRepasitory(e: React.MouseEvent<HTMLImageElement, MouseEvent>) {
  e.preventDefault();
  window.open('https://github.com/ddojung/ddojung-blog');
}

const Home: React.SFC = () => {
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
    </>
  );
};

export default Home;
