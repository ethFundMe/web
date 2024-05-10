/* eslint-disable react-hooks/exhaustive-deps */
import { EffectCallback, useEffect } from 'react';

export function useEffectOnce(effect: EffectCallback) {
  useEffect(effect, []);
}
