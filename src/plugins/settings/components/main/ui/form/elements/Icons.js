import React from 'react';
import { Typography } from '@material-ui/core';
import { Item } from 'plugins/settings/components/shared/Layout';

const Icons = ({ text,value }) => {
  return (
    <Item>
      <Typography variant='subtitle2'>{text}:</Typography>
      <Typography variant='body1'>"{value}"</Typography>
    </Item>
  );
};

export default Icons;
