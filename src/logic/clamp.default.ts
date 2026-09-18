function clamp<T extends number>(value: T, min: T, max: T): T {
  "worklet";

  return Math.min(Math.max(value, min), max) as T;
}

export { clamp };
