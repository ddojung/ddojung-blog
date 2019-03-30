import * as React from 'react';

import styles from './style.css';

const BlogPostContent: React.FC = ({ children }) => {
  return <div className={styles.descriptionBox}>{children}</div>;
};

export default BlogPostContent;
