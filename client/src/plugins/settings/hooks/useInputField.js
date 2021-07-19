import { useState, useEffect, useCallback } from 'react';

export const useInputField = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);

  const handleInputChanged = useCallback(event => {
    setValue(event.target.value);
  }, []);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return { value, onChange: handleInputChanged };
};
