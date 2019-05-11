import * as React from 'react';

import Head from 'next/head';
import ReactGA from 'react-ga';

interface IHeadProps {
  title: string;
  icon?: boolean;
}

ReactGA.initialize('UA-138243475-1');

const DdHead: React.FC<IHeadProps> = ({ title, icon }) => {
  return (
    <Head>
      <title>{title + ' - ddojung blog'}</title>
      <link rel="shortcut icon" href="/static/media/pig.ico" />
      {icon && <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />}
      <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
      <link href="https://cdn.quilljs.com/1.3.6/quill.bubble.css" rel="stylesheet" />
      <link href="https://cdn.quilljs.com/1.3.6/quill.core.css" rel="stylesheet" />
    </Head>
  );
};

export default DdHead;
