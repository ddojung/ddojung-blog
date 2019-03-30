import React, { useContext } from 'react';

import styles from './style.css';
import DdHead from '../Head/Head';
import { AuthStore } from '../../../stores/AuthStore';
import { observer } from 'mobx-react-lite';

interface IHeaderProps {
  title?: string;
  icon?: boolean;
}

const Header: React.FC<IHeaderProps> = ({ title, icon }) => {
  const authStore = useContext(AuthStore);

  if (!title) {
    title = 'unknown';
  }

  const message = authStore.UserInfo === null ? '로그인해주세요.' : `${authStore.UserInfo.displayName}님 환영합니다.`;
  const btnSign = (() => {
    if (authStore.UserInfo === null) {
      return <button onClick={authStore.signIn}>Sign In</button>;
    }

    return <button onClick={authStore.signOut}>Sign Out</button>;
  })();

  console.log(authStore.UserInfo);

  return (
    <div>
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
        <div className={styles.userInfoDiv}>
          {message} {btnSign}
        </div>
      </div>
    </div>
  );
};

export default observer(Header);
