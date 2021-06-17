import React from 'react';
import { formatDate } from 'utils/dateUtils';
import { Code } from 'plugins/settings/components/Layout';

const Format = ({ text, value }) => {
  return <Code>{formatDate(value)}</Code>;
};

export default Format;
