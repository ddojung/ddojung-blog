import * as React from 'react';
import { DateTime } from 'luxon';

const IntroducePage = () => {
  const [like, setLike] = React.useState<number>(0);

  React.useEffect(() => {});

  return (
    <>
      <h2>Introduce</h2>
      <h3>LEE SOJUNG</h3>
      <div>
        Like: <button onClick={() => setLike(like - 1)}>-</button>
        {like}
        <button onClick={() => setLike(like + 1)}>+</button>
      </div>
    </>
  );
};

export default IntroducePage;
