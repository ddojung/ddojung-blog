import * as React from 'react';
import styles from './style.css';
import Header from './Header/Header';
import IconMenu from './Icon/IconMenu';
import Explorer from './Explorer/Explorer';
import ContentTitle from './Content/ContentTitle';
import ContentBody from './Content/ContentBody';

interface IContainerProps {
  title?: string;
  contentTitle?: string;
}

const Container: React.SFC<IContainerProps> = ({ title, contentTitle, children }) => {
  return (
    <>
      <Header title={title} icon={true} />
      <div className={styles.container}>
        <IconMenu />
        <Explorer />
        <div className={styles.contentBox}>
          <ContentTitle title={contentTitle || 'unknown'} />
          <ContentBody>{children}</ContentBody>
        </div>
      </div>
    </>
  );
};

export default Container;
