import {
  DROP_GROW_POWER,
  DROP_GROW_SPAN,
  DROP_STRETCH,
  EDGE_MARGIN,
  NECK_BREAK,
  NECK_FALL,
  NECK_RISE,
} from "@/constants/notification.consts";
import type {
  IBuildNotificationGeometry,
  INotificationGeometry,
} from "@/interfaces/notification-geometry.interface";
import { clamp } from "@/logic/clamp.default";
import { easeOutPower } from "@/logic/ease-power-out";
import { mix } from "@/logic/mix.default";
import { neckProfile } from "@/logic/neck-profile";

function buildNotificationGeometry<T extends IBuildNotificationGeometry>({
  drop,
  expand,
  layout,
}: T): INotificationGeometry {
  "worklet";
  const grow = easeOutPower(
    clamp(drop / DROP_GROW_SPAN, 0, 1),
    DROP_GROW_POWER,
  );
  const neck = neckProfile(drop / NECK_BREAK, NECK_RISE, NECK_FALL);

  const stretch = 1 + DROP_STRETCH * neck;
  const droplet = layout.dropSize * grow;

  const width = Math.min(
    mix(expand, droplet / stretch, layout.cardWidth),
    layout.width - EDGE_MARGIN * 2,
  );
  const height = mix(expand, droplet * stretch, layout.cardHeight);
  const radius = Math.min(
    mix(expand, droplet * 0.5, layout.cardRadius),
    Math.min(width, height) / 2,
  );

  const originY = layout.islandBottom - layout.islandHeight * 0.34;
  const centerY = mix(drop, originY, layout.cardCenterY);

  const neckWidth = Math.min(layout.neckWidth, width) * neck;
  const neckY = layout.islandBottom - layout.islandHeight * 0.5;

  return {
    x: layout.centerX - width / 2,
    y: centerY - height / 2,
    width,
    height,
    radius,
    neckX: layout.centerX - neckWidth / 2,
    neckY,
    neckWidth,
    neckHeight: Math.max(centerY - neckY, 0),
    neckRadius: neckWidth / 2,
    shadowOpacity: clamp(expand, 0, 1),
    offsetY: centerY - layout.cardCenterY,
    widthRatio: layout.cardWidth > 0 ? width / layout.cardWidth : 0,
  };
}

export { buildNotificationGeometry };
