import { useCallback, useEffect, useState } from 'react';

interface UseQueryStateOptions {
  defaultValue: number;
  maxValue?: number;
  minValue?: number;
}

export const useQueryState = (key: string, options: UseQueryStateOptions) => {
  const { defaultValue, maxValue = Infinity, minValue = 1 } = options;

  const getQueryParam = (param: string): string | null => {
    if (typeof window === 'undefined') return null;
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(param);
  };

  const setQueryParam = (param: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(param, value);
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.replaceState(null, '', newUrl);
  };

  const initialValue = () => {
    const queryValue = getQueryParam(key);
    const parsedValue = queryValue ? parseInt(queryValue, 10) : defaultValue;
    return Math.max(minValue, Math.min(maxValue, parsedValue));
  };

  const [value, setValue] = useState<number>(initialValue);

  useEffect(() => {
    const handlePopState = () => {
      const queryValue = getQueryParam(key);
      const newValue = queryValue ? parseInt(queryValue, 10) : defaultValue;
      setValue(Math.max(minValue, Math.min(maxValue, newValue)));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [key, defaultValue, minValue, maxValue]);

  const updateValue = useCallback(
    (newValue: number) => {
      const constrainedValue = Math.max(minValue, Math.min(maxValue, newValue));
      setValue(constrainedValue);
      setQueryParam(key, constrainedValue.toString());
    },
    [key, minValue, maxValue]
  );

  const nextStep = useCallback(() => {
    updateValue(value + 1);
  }, [value, updateValue]);

  const prevStep = useCallback(() => {
    updateValue(value - 1);
  }, [value, updateValue]);

  const resetStep = useCallback(() => {
    updateValue(defaultValue);
  }, [defaultValue, updateValue]);

  return {
    step: value,
    nextStep,
    prevStep,
    resetStep,
  };
};
