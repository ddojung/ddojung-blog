import * as React from 'react';

import styles from './style.css';
import Icon from '../Icon/Icon';
import { observer } from 'mobx-react-lite';
import { MenuStore } from '../../../stores/MenuStore';
import { AuthStore } from '../../../stores/AuthStore';

function changeEditMode() {
  MenuStore.EditMode = true;
}

const Explorer: React.FC = () => {
  const authStore = React.useContext(AuthStore);

  return (
    <div className={styles.container}>
      <div className={styles.explorerTitle}>
        EXPLORER {authStore.IsAdmin && <button onClick={changeEditMode}>edit</button>}
      </div>
      <div className={styles.ddojungTitle}>
        <Icon type="signal_cellular_4_bar" /> DDOJUNG-BLOG
      </div>
      <div className={styles.commonPadding}>
        {(MenuStore.Location === 0 || MenuStore.Location === 1) && tech()}
        {(MenuStore.Location === 0 || MenuStore.Location === 2) && food()}
        {(MenuStore.Location === 0 || MenuStore.Location === 3) && misc()}
      </div>
    </div>
  );
};

const tech = () => {
  return (
    <>
      <img className={styles.documentImg} src="/static/media/folder.svg" alt="" />
      <span>Programming</span>
      <div className={styles.commonPadding}>
        <img className={styles.documentImg} src="/static/media/browser.svg" alt="" />
        <span className={styles.contentName}>tech</span>
      </div>
    </>
  );
};

const food = () => {
  return (
    <>
      <img className={styles.documentImg} src="/static/media/folder.svg" alt="" />
      <span>Food</span>
      <div className={styles.commonPadding}>
        <img className={styles.documentImg} src="/static/media/donut.svg" alt="" />
        <span className={styles.contentName}>food</span>
      </div>
    </>
  );
};

const misc = () => {
  return (
    <>
      <img className={styles.documentImg} src="/static/media/folder.svg" alt="" />
      <span>Chat</span>
      <div className={styles.commonPadding}>
        <img className={styles.documentImg} src="/static/media/conversation.svg" alt="" />
        <span className={styles.contentName}>misc</span>
      </div>
    </>
  );
};

export default observer(Explorer);
