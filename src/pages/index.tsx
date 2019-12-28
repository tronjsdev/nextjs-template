import React from 'react';
import { AppPage } from 'next';

const IndexPage: AppPage = () => {
  return (
    <>
      {/* <Head>
        <title>Override title</title>
      </Head> */}
      <div className="container">
        <p>Please select an option from the left sidebar</p>
      </div>
    </>
  );
};

IndexPage.getInitialProps = async ({ req }) => {
  return {};
};

export default IndexPage;
