import React from 'react';
import NextLink from 'next/link';
import { Link } from '@components';

import { Wrapper } from './header.styled';

const Header = () => (
  <Wrapper>
    <NextLink href="/" passHref>
      <Link
        sx={{
          textDecoration: 'none',
          textTransform: 'uppercase',
          letterSpacing: '2px',
        }}
        fontSize={3}
      >
        Next JS Template
      </Link>
    </NextLink>
  </Wrapper>
);

export default Header;
