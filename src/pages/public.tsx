import React from 'react';
import Link from 'next/link';
import { DefaultLayout } from '@layouts';

// eslint-disable-next-line react/display-name
const PublicPage = props => {
  const { userInfo } = props;
  return (
    <DefaultLayout>
      <h3>Public page</h3>
      <span>{userInfo?.email}</span>
      <Link href="/static-optimization">
        <a>Static</a>
      </Link>
    </DefaultLayout>
  );
};


export default PublicPage;
