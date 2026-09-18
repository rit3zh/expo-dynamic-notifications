import {
  DROP_TINT_END,
  DROP_TINT_START,
  GOO_INSET_RATIO,
  SHADOW_BLUR,
  SHADOW_DY,
} from "@/constants/notification.consts";
import { buildGooMatrix } from "@/core/build-goo-matrix";
import { useDynamicNotifications } from "@/hooks/use-dynamic-notifications";
import { useNotificationGeometry } from "@/hooks/use-notification-geometry";
import type { INotificationGooey } from "@/interfaces/notification-gooey.interface";
import {
  Blur,
  Canvas,
  ColorMatrix,
  Group,
  Paint,
  RoundedRect,
  Shadow,
} from "@shopify/react-native-skia";
import { memo, useMemo } from "react";
import { StyleSheet } from "react-native";
import { interpolateColor, useDerivedValue } from "react-native-reanimated";

const Gooey: React.FC<INotificationGooey> &
  React.FunctionComponent<INotificationGooey> = memo<INotificationGooey>(
  ({
    blur,
    gain,
    threshold,
    islandColor,
    cardColor,
    shadowColor,
  }: INotificationGooey):
    | (React.ReactNode & React.ReactElement & React.JSX.Element)
    | null => {
    const context = useDynamicNotifications();
    const { layout, drop, expand, tint } = context;

    const geometry = useNotificationGeometry({ drop, expand, layout });

    const pill = islandColor ?? context.islandColor;
    const body = cardColor ?? context.cardColor;
    const shade = shadowColor ?? context.shadowColor;
    const radius = blur ?? context.blur;

    const matrix = useMemo(
      () =>
        buildGooMatrix({
          gain: gain ?? context.gain,
          threshold: threshold ?? context.threshold,
        }),
      [gain, threshold, context.gain, context.threshold],
    );

    const inset = radius * GOO_INSET_RATIO;
    const islandX = layout.centerX - layout.islandWidth / 2;

    const droplet = useDerivedValue(
      () =>
        interpolateColor(
          tint.value,
          [DROP_TINT_START, DROP_TINT_END],
          [pill, body],
        ),
      [pill, body],
    );

    return (
      <Canvas
        pointerEvents="none"
        style={[styles.canvas, { height: layout.canvasHeight }]}
      >
        <Group opacity={geometry.shadowOpacity}>
          <RoundedRect
            x={geometry.x}
            y={geometry.y}
            width={geometry.width}
            height={geometry.height}
            r={geometry.radius}
          >
            <Shadow
              dx={0}
              dy={SHADOW_DY}
              blur={SHADOW_BLUR}
              color={shade}
              shadowOnly
            />
          </RoundedRect>
        </Group>

        <Group
          layer={
            <Paint>
              <Blur blur={radius} />
              <ColorMatrix matrix={matrix} />
            </Paint>
          }
        >
          <RoundedRect
            x={islandX + inset}
            y={layout.islandTop + inset}
            width={layout.islandWidth - inset * 2}
            height={layout.islandHeight - inset * 2}
            r={Math.max(layout.islandRadius - inset, 0)}
            color={pill}
          />
          <RoundedRect
            x={geometry.neckX}
            y={geometry.neckY}
            width={geometry.neckWidth}
            height={geometry.neckHeight}
            r={geometry.neckRadius}
            color={pill}
          />
          <RoundedRect
            x={geometry.x}
            y={geometry.y}
            width={geometry.width}
            height={geometry.height}
            r={geometry.radius}
            color={droplet}
          />
        </Group>

        <RoundedRect
          x={islandX}
          y={layout.islandTop}
          width={layout.islandWidth}
          height={layout.islandHeight}
          r={layout.islandRadius}
          color={pill}
        />
      </Canvas>
    );
  },
);

const styles = StyleSheet.create({
  canvas: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
});

export { Gooey };
