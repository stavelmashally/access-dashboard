import React from 'react';
import useStyle from './styles';

const Editor = () => {
  const classes = useStyle();
  
  return (
    <div className={classes.root}>
      <h1>Editor</h1>
    </div>
  );
};

export default Editor;
