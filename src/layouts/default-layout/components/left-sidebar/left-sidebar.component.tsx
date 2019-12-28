import React from 'react';
import NextLink from 'next/link';
import { Box, Flex, Link, Text } from '@components';

const MenuItem = ({ href, children }) => {
  return (
    <NextLink href={href} passHref>
      <Link display={'block'} m={'0.4rem 0'}>{children}</Link>
    </NextLink>
  );
};

/* <MenuItem href="/signin">Signin</MenuItem>
<MenuItem href="/signin/oauth/.well-known/openid-configuration">.well-known</MenuItem> */

const LeftSidebar = () => {
  return (
    <Box
      p={3}
      sx={{
        borderRightWidth: '1px',
        borderRightStyle: 'solid',
        borderRightColor: 'gray.300',
        backgroundColor: 'gray.200',
      }}
      width={220}
    >
      <Box>
        <Text>Menu</Text>
        <Box as={'ul'} pl={3}>
          <MenuItem href={'/auth/login'}>Login</MenuItem>
          <MenuItem href={'/account/logout'}>Logout</MenuItem>
          <MenuItem href={'/account/profile'}>Profile</MenuItem>
          <MenuItem href={'/public'}>Public Page</MenuItem>
        </Box>
      </Box>
    </Box>
  );
};

export default LeftSidebar;
