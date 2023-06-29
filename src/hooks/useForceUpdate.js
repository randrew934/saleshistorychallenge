import { useState } from 'react';

/**
 * Hook to force update the component.
 *
 * Call the rerender function to force update the component.
 * Use the triggerValue as an dependency for other hooks like useEffect, useMemo, useCallback etc.
 *
 * @returns {[() => void, boolean]} { rerender, triggerValue }
 */
export default function useForceUpdate() {
  const [triggerValue, setTriggerValue] = useState(0);

  /**
   * Force updates the component.
   */
  const rerender = () => setTriggerValue((value) => ++value);

  return { rerender, triggerValue };
}
