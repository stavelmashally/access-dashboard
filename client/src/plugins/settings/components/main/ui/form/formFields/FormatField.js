import React from 'react';
import { formatDate } from 'plugins/settings/utils/dateUtils';
import { Code } from 'plugins/settings/components/shared/Layout';

const FormatField = ({ value }) => {
  return <Code>{formatDate(value)}</Code>;
};

export default FormatField;
