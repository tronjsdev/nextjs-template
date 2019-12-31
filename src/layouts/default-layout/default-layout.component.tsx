import React from 'react';
import Head from 'next/head';
import { CSSReset } from '@components';

import { LeftSidebar } from './components/left-sidebar';
import { Header } from './components/header';

type Props = {
  title?: string;
  userInfo?: any;
  isAuthenticated: boolean;
  // isAnonymous: boolean;
};

const DefaultLayout: React.FunctionComponent<Props> = ({
  children,
  title,
  userInfo,
  isAuthenticated,
}) => (
  <>
    <Head>
      {title && <title>{title}</title>}
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      <link href="//cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.min.css" rel="stylesheet" />
      <link
        href="//fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,700,700i&display=swap"
        rel="stylesheet"
      />
    </Head>
    <CSSReset />
    <div style={{height: '100vh'}}>
      <LeftSidebar userInfo={userInfo} isAuthenticated={isAuthenticated} />
      <div>
        <Header />
        <div className="p-4">
          <h3 className="text-gray-600 text-xs uppercase">{title}</h3>
        </div>
        <div className="p-4">{children}</div>
        {/* <Footer /> */}
      </div>
    </div>
  </>
);

export default DefaultLayout;
