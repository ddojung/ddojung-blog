import * as React from 'react';

import styles from './style.css';
import DdHead from '../Head/Head';

interface IHeaderProps {
  title?: string;
  icon?: boolean;
}

const Header: React.SFC<IHeaderProps> = ({ title, icon }) => {
  if (!title) {
    title = 'unknown';
  }

  return (
    <>
      <DdHead title={title} icon={icon} />
      <div className={styles.headerContainer}>
        <div className={styles.btnBox}>
          <button className={styles.red} />
          <button className={styles.yellow} />
          <button className={styles.green} />
        </div>
        <div className={styles.logo}>
          <a className={styles.anchor} href="/">
            <span className={styles.blogPoint}>{title} </span>
            ⎯⎯⎯⎯ ddojung.blog
          </a>
        </div>
        <div className={styles.emptyDiv} />
      </div>
    </>
  );
};

export default Header;
