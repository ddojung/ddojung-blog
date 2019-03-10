import * as React from 'react';
import styles from './style.css';

const ContentTitle: React.SFC<{ title: string }> = ({ title }) => {
  return (
    <div className={styles.contentTitleBox}>
      <div className={styles.titleBox}>
        <img className={styles.documentImg} src="/static/media/edit.svg" alt="" />
        <span className={styles.documentTitle}>{title}</span>
      </div>
    </div>
  );
};

export default ContentTitle;
