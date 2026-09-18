function easeOutPower(progress: number, power: number): number {
  "worklet";
  const normalized = Math.min(Math.max(progress, 0), 1);
  return 1 - Math.pow(1 - normalized, power);
}

export { easeOutPower };
