import React from 'react';
import NextLink from 'next/link';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  display: flex;
`;

const Header = () => (
  <Wrapper>
    <NextLink href="/" passHref>
      <a
        css={{
          textDecoration: 'none',
          textTransform: 'uppercase',
          letterSpacing: '2px',
        }}
      >
        Next JS Template
      </a>
    </NextLink>
  </Wrapper>
);

export default Header;
