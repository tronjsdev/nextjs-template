import React, { useEffect } from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';

const LOGIN_URL = '/auth/login';

export const auth = ctx => {
  // const { token } = nextCookie(ctx);
  const { req } = ctx;
  const props: any = {};
  if (req) {
    const { session } = req;
    props.isAuthenticated = session?.isAuthenticated;
  } else {
    const {__NEXT_DATA__:{props:winProps}}:any =window;
    const {
      serverData,
      isAuthenticated,
      userinfo,
    } = winProps;
    props.isAuthenticated  = isAuthenticated;
    props.serverData = serverData;
    props.userinfo = userinfo;
  }

  // If there's no token, it means the user is not logged in.
  if (!props.isAuthenticated) {
    const nextUrl = ctx.pathname;
    const loginUrl = nextUrl?`${LOGIN_URL}?nextUrl=${nextUrl}`:LOGIN_URL;
    if (typeof window === 'undefined') {
      debugger;
      ctx.res.writeHead(302, { Location: loginUrl });
      ctx.res.end();
    } else {
      console.log('auth redirects to /login/google');
      Router.push(loginUrl);
    }
  }

  return props ;
};

export const logout = () => {
  // to support logging out from all windows
  window.localStorage.setItem('logout', Date.now() as any);
  Router.push(LOGIN_URL);
};

export const withAuthSync = WrappedComponent => {
  const Wrapper = props => {
    const syncLogout = event => {
      if (event.key === 'logout') {
        console.log('logged out from storage!');
        Router.push(LOGIN_URL);
      }
    };

    useEffect(() => {
      window.addEventListener('storage', syncLogout);

      return () => {
        window.removeEventListener('storage', syncLogout);
        window.localStorage.removeItem('logout');
      };
    }, []);

    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async ctx => {
    const props = auth(ctx);

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));
    return { ...componentProps };
  };

  return Wrapper;
};
