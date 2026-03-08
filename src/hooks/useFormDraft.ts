import { useState, useCallback, useRef, useEffect } from 'react';
import { storage } from '../utils/storage';

export function useFormDraft<T>(stepKey: string) {
  const [showSaved, setShowSaved] = useState(false);
  const fadeRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const loadDraft = useCallback((): T | null => {
    return storage.get<T>(stepKey);
  }, [stepKey]);

  const saveDraft = useCallback(
    (values: T) => {
      storage.set(stepKey, values);
      setShowSaved(true);
      clearTimeout(fadeRef.current);
      fadeRef.current = setTimeout(() => setShowSaved(false), 2000);
    },
    [stepKey],
  );

  const onValuesChange = useCallback(
    (_changed: Partial<T>, allValues: T) => {
      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => saveDraft(allValues), 500);
    },
    [saveDraft],
  );

  useEffect(() => {
    return () => {
      clearTimeout(fadeRef.current);
      clearTimeout(debounceRef.current);
    };
  }, []);

  return { loadDraft, saveDraft, onValuesChange, showSaved };
}
