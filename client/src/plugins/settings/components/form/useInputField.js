import { useState } from 'react';

export const useInputField = (label, initialValue, onEnter) => {
  const [value, setValue] = useState(initialValue);

  const handleInputChanged = event => {
    const newValue = event.target.value;
    if (isNaN(initialValue)) {
      if (initialValue.startsWith('#') && !newValue.startsWith('#')) return;
      setValue(newValue);
    } else setValue(Number(newValue));
  };

  const handleKeyDown = event => {
    const { key } = event;
    if (key === 'Enter') onEnter({ label, value });
    if (key === 'Escape') setValue(initialValue);
  };

  return { value, onChange: handleInputChanged, onKeyDown: handleKeyDown };
};
