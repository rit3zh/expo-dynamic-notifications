interface IBuildGooMatrix {
  gain: number;
  threshold: number;
}

interface INotificationGooey {
  blur?: number;
  gain?: number;
  threshold?: number;
  islandColor?: string;
  cardColor?: string;
  shadowColor?: string;
}

export type { IBuildGooMatrix, INotificationGooey };
