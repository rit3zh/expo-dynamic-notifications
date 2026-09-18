import type { IBuildGooMatrix } from "@/interfaces/notification-gooey.interface";

function buildGooMatrix({ gain, threshold }: IBuildGooMatrix): number[] {
  return [
    1, 0, 0, 0, 0,
    0, 1, 0, 0, 0,
    0, 0, 1, 0, 0,
    0, 0, 0, gain, -gain * threshold,
  ];
}

export { buildGooMatrix };
