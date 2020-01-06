import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const { req, res, query } = ctx;
    const initialProps = await Document.getInitialProps(ctx);

    const initProps: any = {};

    if (typeof window === 'undefined') {
      const { userContext, serverData, isAuthenticated } = res?.locals || {};
      initProps.serverData = serverData;
      initProps.isAuthenticated = isAuthenticated;
      initProps.userInfo = userContext?.userInfo;
    }

    return { ...initialProps, initProps };
  }

  render() {
    const { initProps }: any = this.props;
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <script
            id="__server-init-props"
            type="application/json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(initProps, null, 2),
            }}
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
