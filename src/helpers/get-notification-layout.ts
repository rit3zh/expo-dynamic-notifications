import {
  CANVAS_PADDING,
  CARD_GAP,
  CARD_HEIGHT,
  CARD_MARGIN,
  CARD_MAX_WIDTH,
  DROP_SIZE,
  ISLAND_HEIGHT,
  ISLAND_MIN_TOP,
  ISLAND_TOP,
  ISLAND_WIDTH,
  NECK_WIDTH,
} from "@/constants/notification.consts";
import type { INotificationLayout } from "@/interfaces/notification-layout.interface";

interface IGetNotificationLayout {
  width: number;
  insetTop: number;
  islandWidth?: number;
  islandHeight?: number;
  islandTop?: number;
  cardWidth?: number;
  cardHeight?: number;
  cardRadius?: number;
  gap?: number;
}

const getNotificationLayout = ({
  width,
  insetTop,
  islandWidth,
  islandHeight,
  islandTop,
  cardWidth,
  cardHeight,
  cardRadius,
  gap,
}: IGetNotificationLayout): INotificationLayout => {
  const pillWidth = islandWidth ?? ISLAND_WIDTH;
  const pillHeight = islandHeight ?? ISLAND_HEIGHT;
  const pillTop =
    islandTop ?? Math.max(insetTop - pillHeight - ISLAND_TOP, ISLAND_MIN_TOP);
  const pillBottom = pillTop + pillHeight;

  const bodyWidth =
    cardWidth ?? Math.min(width - CARD_MARGIN * 2, CARD_MAX_WIDTH);
  const bodyHeight = cardHeight ?? CARD_HEIGHT;
  const bodyTop = pillBottom + (gap ?? CARD_GAP);

  return {
    width,
    centerX: width / 2,
    islandWidth: pillWidth,
    islandHeight: pillHeight,
    islandTop: pillTop,
    islandBottom: pillBottom,
    islandCenterY: pillTop + pillHeight / 2,
    islandRadius: pillHeight / 2,
    cardWidth: bodyWidth,
    cardHeight: bodyHeight,
    cardRadius: cardRadius ?? bodyHeight / 2,
    cardTop: bodyTop,
    cardLeft: (width - bodyWidth) / 2,
    cardCenterY: bodyTop + bodyHeight / 2,
    dropSize: DROP_SIZE,
    neckWidth: NECK_WIDTH,
    canvasHeight: bodyTop + bodyHeight + CANVAS_PADDING,
  };
};

export { getNotificationLayout };
export type { IGetNotificationLayout };
