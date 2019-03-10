import * as React from 'react';
import styles from './style.css';

const Home: React.SFC = () => {
  return (
    <>
      <div className={styles.welcomeTextBox}>
        <span>What Is This Blog?</span>
        <span className={styles.subTitle}> ddojung blog</span>
      </div>
      <div className={styles.descriptionBox}>
        <pre>안뇽하세여 이소정입니다요</pre>
      </div>
    </>
  );
};

export default Home;
