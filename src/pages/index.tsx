import React from 'react';
import { AppPage } from 'next';
import {DefaultLayout} from "@layouts";

const IndexPage: AppPage = () => {
  return (
    <DefaultLayout>
      {/* <Head>
        <title>Override title</title>
      </Head> */}
      <div className="container">
        <p>Please select an option from the left sidebar</p>
      </div>
    </DefaultLayout>
  );
};

IndexPage.getInitialProps = async ({ req }) => {
  return {};
};

export default IndexPage;
