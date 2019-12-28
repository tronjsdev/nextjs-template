import React from 'react';
import { AppPage } from 'next';
import { withAuthSync } from '@utils';

const ProfilePage: AppPage = (props: any) => {
  const { userInfo } = props;
  return <div>{userInfo.email}</div>;
};

ProfilePage.getInitialProps = async ({ req, res, query }) => {
  return {};
};

export default withAuthSync(ProfilePage);
