import React from 'react';

// eslint-disable-next-line react/display-name
export default props => {
  const { userInfo } = props;
  return (
    <div>
      <div>Public page</div>
      <span>{userInfo.email}</span>
    </div>
  );
};
