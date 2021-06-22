import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  btn: {
    backgroundColor: '#eee',
    fontFamily: ['consolas', 'courier', 'monospace'],
    padding: '0 3px',
    textTransform: 'none',
  },
}));

const ClipboardText = ({ text }) => {
  const classes = useStyles();
  const [tooltip, setTooltip] = useState('Copy');

  useEffect(() => {
    const id = setTimeout(() => setTooltip('Copy'), 1000);
    return () => clearTimeout(id);
  }, [tooltip]);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setTooltip('Copied!');
    } catch (error) {}
  };

  return (
    <Tooltip title={tooltip} arrow placement='right'>
      <Button className={classes.btn} onClick={handleClick}>
        {text}
      </Button>
    </Tooltip>
  );
};

export default ClipboardText;
