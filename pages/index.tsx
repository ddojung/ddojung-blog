import * as React from 'react';
import Container from '../components/common/Container';
import Home from '../components/home/Home';

const IndexPage: React.SFC = () => {
  return (
    <>
      <Container title="Welcome" contentTitle="What_Is_This_Blog.question">
        <Home />
      </Container>
    </>
  );
};

export default IndexPage;
