import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Link,
  Tooltip,
} from '@material-ui/core';
import { Save } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  appBar: {
    width: `calc(100% - 240px)`,
    display: 'flex',
  },
  appBarItems: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const Header = () => {
  const classes = useStyles();

  const renderTitle = () => {
    return (
      <Link href='/' color='inherit' underline='none'>
        <Typography variant='h6'>Config Dashboard</Typography>
      </Link>
    );
  };

  const renderButtons = () => {
    return (
      <div>
        <Tooltip title='Save'>
          <IconButton color='inherit' aria-label='save' component='span'>
            <Save />
          </IconButton>
        </Tooltip>
      </div>
    );
  };

  return (
    <AppBar position='fixed' elevation={0} className={classes.appBar}>
      <Toolbar>
        <div className={classes.appBarItems}>
          {renderTitle()}
          {renderButtons()}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
