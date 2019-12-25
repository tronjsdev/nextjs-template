import React from 'react';
import { AppPage } from 'next';

const LoginPage: AppPage = () => {
  return (
    <form action="/auth/login" method="POST">
      <div>
        <input type="text" placeholder="Username" name="username" />
      </div>
      <div>
        <input type="password" placeholder="Password" name="password" />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

LoginPage.getInitialProps = async ({ query }) => {
  return {};
};

export default LoginPage;
