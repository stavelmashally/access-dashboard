import React from 'react';
import { Typography } from '@material-ui/core';
import { Code, Item } from 'plugins/settings/components/Layout';

const Type = ({ text, value }) => {
  return (
    <Item>
      <Typography>{text}</Typography>
      <Code>{value}</Code>
    </Item>
  );
};

export default Type;
