import React from 'react';
import {formatDate} from 'utils/dateUtils'
import { Code } from 'plugins/settings/components/Layout';

const Formats = ({ value }) => {
  return (
    <div>
      <Code>{formatDate(value)}</Code>
    </div>
  );
};

export default Formats;
