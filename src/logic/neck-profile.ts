import { clamp } from "./clamp.default";

function neckProfile(progress: number, rise: number, fall: number): number {
  "worklet";
  const t = clamp(progress, 0, 1);
  if (t <= 0 || t >= 1) {
    return 0;
  }
  const peak = rise / (rise + fall);
  const normal = Math.pow(peak, rise) * Math.pow(1 - peak, fall);
  return (Math.pow(t, rise) * Math.pow(1 - t, fall)) / normal;
}

export { neckProfile };
