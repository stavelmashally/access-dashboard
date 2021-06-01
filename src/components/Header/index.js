import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import useStyles from './styles';

const Header = () => {
  const classes = useStyles();
  return (
    <div>
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <Typography variant='h6'>Config Dashboard</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
