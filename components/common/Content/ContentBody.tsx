import * as React from 'react';
import styles from './style.css';

const ContentBody: React.FC = ({ children }) => {
  return <div className={styles.contentBodyBox}>{children}</div>;
};

export default ContentBody;
