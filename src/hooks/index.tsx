import { useEffect, useState } from "react";

export const useDebounce = (value: string, timeout?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, timeout || 500);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
};