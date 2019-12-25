import React from 'react';
import { Box, Flex, Text, Link, FlexProps } from 'rebass';

export const Wrapper: React.FunctionComponent<FlexProps> = props => (
  <Flex alignItems="center" {...props} />
);
