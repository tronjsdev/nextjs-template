import React from 'react';
import { AppPage } from 'next';
import { withAuthSync } from '@libs';

const ProfilePage: AppPage = (props: any) => {
  const { userInfo } = props;
  return (
    <div>
      <h3>Profile</h3>
      <pre>{JSON.stringify(userInfo)}</pre>
    </div>
  );
};

ProfilePage.getInitialProps = async ({ req, res, query }) => {
  return {};
};

export default withAuthSync(ProfilePage);
