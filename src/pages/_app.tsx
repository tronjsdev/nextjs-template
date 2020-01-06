import App from 'next/app';
import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { theme } from '@libs';

export default class MyApp extends App {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  /*static async getInitialProps({ Component, ctx }) {
  
  }*/

  componentDidCatch(error, errorInfo) {
    console.error('CUSTOM ERROR HANDLING', error);
    // This is needed to render errors correctly in development / production
    super.componentDidCatch(error, errorInfo);
  }

  render() {
    const { Component, pageProps, ...rest }: any = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}
