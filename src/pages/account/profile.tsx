import React from 'react';
import { AppPage } from 'next';
import { withAuthSync } from '@libs';
import { DefaultLayout } from '@layouts';

const ProfilePage: AppPage = (props: any) => {
  console.log('Profile page props', props);
  const {
    initProps: { userInfo },
  } = props;
  return (
    <DefaultLayout title="Profile">
      <h3>Profile</h3>
      <pre>{JSON.stringify(userInfo)}</pre>
    </DefaultLayout>
  );
};

ProfilePage.getInitialProps = async ({ req, res, query }) => {
  return { profilePage1: 'hello', profilePage2: 2 };
};

export default withAuthSync(ProfilePage);
