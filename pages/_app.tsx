import React from 'react';

import '../components/style.css';
import App, { Container } from 'next/app';

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }: any) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <link rel="stylesheet" href="/static/media/tui-editor.css" />
        <link rel="stylesheet" href="/static/media/tui-editor-contents.css" />
        <Component {...pageProps} />
      </Container>
    );
  }
}
