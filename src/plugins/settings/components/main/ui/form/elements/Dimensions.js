import React from 'react';
import ClipboardText from 'plugins/settings/components/main/ui/form/ClipboardText';
import { Typography } from '@material-ui/core';
import { Item } from 'plugins/settings/components/shared/Layout';

const Dimensions = ({ text, value }) => {
  return (
    <Item>
      <Typography variant='subtitle1'>{text}</Typography>
      <ClipboardText text={value} />
    </Item>
  );
};

export default Dimensions;
