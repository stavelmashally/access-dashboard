import React from 'react';
import { Typography } from '@material-ui/core';
import ClipboardText from '../ClipboardText';
import { Item } from 'plugins/settings/components/shared/Layout';

const Type = ({ text, value }) => {
  return (
    <Item>
      <Typography>{text}</Typography>
      <ClipboardText text={value} />
    </Item>
  );
};

export default Type;
