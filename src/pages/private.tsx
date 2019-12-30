import React from 'react';
import { AppPage } from 'next';
import { withAuthSync } from '@utils';

const PrivatePage: AppPage = (props: any) => {
  const { userInfo,param1, param2 } = props;
  return (
    <div>
      <h3>Private</h3>
      <pre>{JSON.stringify(userInfo)}</pre>
      <pre>{JSON.stringify({param1, param2})}</pre>
    </div>
  );
};

PrivatePage.getInitialProps = async ({ req, res, query }: any) => {
  const { param1, param2 } = req?.query || {};
  return { param1, param2 };
};

export default withAuthSync(PrivatePage);
