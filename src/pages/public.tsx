import React from 'react';

// eslint-disable-next-line react/display-name
export default props => {
  const { userInfo } = props;
  return (
    <div>
      <h3>Public page</h3>
      <span>{userInfo?.email}</span>
    </div>
  );
};
