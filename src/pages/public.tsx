import React from 'react';
import Link from 'next/link';

// eslint-disable-next-line react/display-name
export default props => {
  const { userInfo } = props;
  return (
    <div>
      <h3>Public page</h3>
      <span>{userInfo?.email}</span>
      <Link href="/static-optimization">
        <a>Static</a>
      </Link>
    </div>
  );
};
