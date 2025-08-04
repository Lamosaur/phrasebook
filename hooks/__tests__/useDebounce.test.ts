import { renderHook, act } from '@testing-library/react-native';
import { useDebounce } from '../useDebounce';

// Use fake timers to control setTimeout
jest.useFakeTimers();

describe('useDebounce', () => {
  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('should not update the value before the delay has passed', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'first', delay: 500 },
    });

    expect(result.current).toBe('first');

    // Rerender with a new value
    rerender({ value: 'second', delay: 500 });

    // The value should still be the old one
    expect(result.current).toBe('first');
  });

  it('should update the value after the delay has passed', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'first', delay: 500 },
    });

    rerender({ value: 'second', delay: 500 });

    // Fast-forward time by 500ms
    act(() => {
      jest.advanceTimersByTime(500);
    });

        // Now the value should be updated
        expect(result.current).toBe('second');
      });
    });