import React from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import { Toolbar } from '@material-ui/core';
import useStyles from './styles';

const Layout = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <Sidebar />
      <div className={classes.content}>
        <Toolbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
