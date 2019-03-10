import * as React from 'react';
import Head from 'next/head';

interface IHeadProps {
  title: string;
  icon?: boolean;
}

const DdHead: React.SFC<IHeadProps> = ({ title, icon }) => {
  return (
    <Head>
      <title>{title + ' - ddojung blog'}</title>
      <link rel="shortcut icon" href="/static/media/pig.ico" />
      {icon && <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />}
    </Head>
  );
};

export default DdHead;
