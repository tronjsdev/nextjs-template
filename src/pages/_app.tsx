import App from 'next/app';
import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { theme } from '@utils';

import { DefaultLayout } from '../layouts';

export default class MyApp extends App {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  static async getInitialProps({ Component, ctx }) {
    const { req } = ctx;

    let pageProps: any = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    if (req) {
      const { locals, user } = req;
      const { userInfo } = user || {};
      pageProps.serverData = locals?.serverData;
      pageProps.isAuthenticated = req.isAuthenticated();
      pageProps.userInfo = userInfo;
    } else {
      const {
        __NEXT_DATA__: { props },
      }: any = window || {};
      const { serverData, isAuthenticated, userInfo } = props;
      pageProps.serverData = serverData;
      pageProps.isAuthenticated = isAuthenticated;
      pageProps.userInfo = userInfo;
    }

    return { ...pageProps };
  }

  componentDidCatch(error, errorInfo) {
    console.error('CUSTOM ERROR HANDLING', error);
    // This is needed to render errors correctly in development / production
    super.componentDidCatch(error, errorInfo);
  }

  render() {
    const { Component, ...pageProps }: any = this.props;

    const Layout = Component.Layout || DefaultLayout;
    const { title } = Component;
    return (
      <ThemeProvider theme={theme}>
        <Layout title={title}>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    );
  }
}
