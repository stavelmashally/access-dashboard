import { useState, useEffect } from 'react';

export const useStateFromProps = initialState => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    setState(initialState);
  }, [initialState]);

  return [state, setState];
};
