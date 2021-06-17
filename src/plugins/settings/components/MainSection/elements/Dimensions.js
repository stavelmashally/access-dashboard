import React from 'react';
import { Typography } from '@material-ui/core';
import { Code, Item } from 'plugins/settings/components/Layout';

const Dimensions = ({text, value }) => {
  return (
    <Item>
      <Typography variant='h6'>{text}</Typography>
      <Code>{value}</Code>
    </Item>
  );
};

export default Dimensions;
