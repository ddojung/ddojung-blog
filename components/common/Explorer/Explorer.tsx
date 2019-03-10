import * as React from 'react';
import styles from './style.css';
import Icon from '../Icon/Icon';

const Explorer: React.SFC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.explorerTitle}>EXPLORER</div>
      <div className={styles.ddojungTitle}>
        <Icon type="signal_cellular_4_bar" /> DDOJUNG-BLOG
      </div>
    </div>
  );
};

export default Explorer;
