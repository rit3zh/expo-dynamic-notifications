function mix<T extends number>(progress: number, from: T, to: T): number {
  "worklet";
  return from + (to - from) * progress;
}

export { mix };
