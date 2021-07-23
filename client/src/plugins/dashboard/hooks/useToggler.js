import React, { useCallback } from 'react';

export const useToggler = (initialState = false) => {
  const [value, setValue] = React.useState(initialState);

  const toggleValue = useCallback(() => setValue(prev => !prev), []);

  return [value, toggleValue];
};
