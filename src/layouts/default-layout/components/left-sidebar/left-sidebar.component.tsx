import React from 'react';
import NextLink from 'next/link';

const MenuItem = ({ href, children }) => {
  return (
    <NextLink href={href} passHref>
      <a css={{ display: 'block', margin: '.4rem 0' }}>{children}</a>
    </NextLink>
  );
};

/* <MenuItem href="/signin">Signin</MenuItem>
<MenuItem href="/signin/oauth/.well-known/openid-configuration">.well-known</MenuItem> */

const LeftSidebar = props => {
  return (
    <div css={{ padding: '1rem' }}>
      <div>
        <div>Menu</div>
        <ul>
          <MenuItem href={'/auth/login'}>Login</MenuItem>
          <MenuItem href={'/account/logout'}>Logout</MenuItem>
          <MenuItem href={'/account/profile'}>Profile</MenuItem>
          <MenuItem href={'/public'}>Public Page</MenuItem>
          <MenuItem href={'/static-optimization'}>automatic-static-optimization</MenuItem>
          <MenuItem href={'/private?param1=1&param2=2'}>Demo `nextUrl`</MenuItem>
        </ul>
      </div>
    </div>
  );
};

export default LeftSidebar;
