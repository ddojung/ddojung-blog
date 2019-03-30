import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { EN_MENU_TYPE } from '../../../models/enum/EN_MENU_TYPE';
import { AuthStore } from '../../../stores/AuthStore';
import { MenuStore } from '../../../stores/MenuStore';
import Icon from '../Icon/Icon';
import styles from './style.css';

function changeEditMode() {
  location.href = '/editor';
}

const Explorer: React.FC = () => {
  const authStore = React.useContext(AuthStore);

  return (
    <div className={styles.container}>
      <div className={styles.explorerTitle}>
        EXPLORER {authStore.IsAdmin && <button onClick={changeEditMode}>write</button>}
      </div>
      <div className={styles.ddojungTitle}>
        <Icon type="signal_cellular_4_bar" /> DDOJUNG-BLOG
      </div>
      <div className={styles.commonPadding}>
        {(MenuStore.Location === 0 || MenuStore.Location === 1) && menuEle(EN_MENU_TYPE.PROGRAMMING, 'browser')}
        {(MenuStore.Location === 0 || MenuStore.Location === 2) && menuEle(EN_MENU_TYPE.FOOD, 'donut')}
        {(MenuStore.Location === 0 || MenuStore.Location === 3) && menuEle(EN_MENU_TYPE.CHAT, 'conversation')}
      </div>
    </div>
  );
};

const menuEle = (type: EN_MENU_TYPE, svgName: string) => {
  const folder = type.toLowerCase();
  const extension = (() => {
    if (type === EN_MENU_TYPE.PROGRAMMING) {
      return '.tech';
    }

    if (type === EN_MENU_TYPE.FOOD) {
      return '.food';
    }

    return '.chat';
  })();

  const contentsNum = MenuStore.MenuTitle && MenuStore.MenuTitle[folder].length;

  return (
    <div>
      <img className={styles.documentImg} src="/static/media/folder.svg" alt="" />
      <span>{type + ' (' + contentsNum + ')'}</span>

      {MenuStore.MenuTitle &&
        MenuStore.MenuTitle[folder].map(data => {
          const title = data.title.replace(/\s/g, '_');

          return (
            <div key={data.id} className={styles.commonPadding}>
              <img className={styles.documentImg} src={`/static/media/${svgName}.svg`} alt="" />
              <span className={styles.contentName}>
                <a href={`/${folder}/${data.id}`}>{title + extension}</a>
              </span>
            </div>
          );
        })}
    </div>
  );
};

export default observer(Explorer);
