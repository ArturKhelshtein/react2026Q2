import { useCallback, useState } from 'react';

export function useLocalStorage(
  key: string,
  initialValue: string
): readonly [string, (value: string) => void] {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      return localStorage.getItem(key) ?? initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: string) => {
      try {
        localStorage.setItem(key, value);
        setStoredValue(value);
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key]
  );

  return [storedValue, setValue] as const;
}
