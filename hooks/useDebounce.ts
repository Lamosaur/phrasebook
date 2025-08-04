import { useState, useEffect } from 'react';

/**
 * A custom hook that debounces a value. It delays updating the value
 * until the user has stopped changing it for a specified amount of time.
 * @param value The value to debounce.
 * @param delay The debounce delay in milliseconds.
 * @returns The debounced value.
 */
export function useDebounce<T>(value: T, delay: number): T {
  // State to store the debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(
    () => {
      // Set a timeout to update the debounced value after the specified delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // The cleanup function to run if the effect is re-called before the timeout finishes.
      // This cancels the previous timeout, effectively "restarting" the debounce timer.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Re-run the effect only if the value or delay changes
  );

  return debouncedValue;
}