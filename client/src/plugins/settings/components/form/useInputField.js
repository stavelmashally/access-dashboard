import { useState, useCallback } from 'react';

export const useInputField = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleInputChanged = useCallback(event => {
    setValue(event.target.value);
  }, []);

  return { value, onChange: handleInputChanged };
};
