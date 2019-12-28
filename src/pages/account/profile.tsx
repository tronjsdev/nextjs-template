import React from 'react';
import { AppPage } from 'next';

const ProfilePage: AppPage = () => {
  return <div>hello</div>;
};

ProfilePage.getInitialProps = async ({req, res, query}) => {
  return {};
};
