import * as React from 'react';

import styles from './style.css';
import { observer } from 'mobx-react-lite';

interface BlogPostTitleProps {
  title: string;
  subTitle?: string;
}

const BlogPostTitle: React.FC<BlogPostTitleProps> = ({ title, subTitle }) => {
  return (
    <div className={styles.titleBox}>
      <span>{title}</span>
      {subTitle && <span className={styles.subTitle}>{' - ' + subTitle}</span>}
    </div>
  );
};

export default observer(BlogPostTitle);
