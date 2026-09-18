import {
  Canvas,
  Group,
  Path,
  PathOp,
  rect,
  rrect,
  Shadow,
  Skia,
} from "@shopify/react-native-skia";
import type { ReactNode } from "react";
import { memo, useCallback, useMemo, useState } from "react";
import type { LayoutChangeEvent } from "react-native";
import { StyleSheet, View } from "react-native";
import { SIZES, THEME } from "./theme";

interface ICutoutSurface {
  width: number;
  height?: number;
  gap?: number;
  color?: string;
  leading: ReactNode;
  trailing: ReactNode;
}

const PAD = 16;
const LEAD_PAD = 17;
const TRAIL_PAD = 13;

const CutoutSurface: React.FC<ICutoutSurface> &
  React.FunctionComponent<ICutoutSurface> = memo<ICutoutSurface>(
  ({
    width,
    height = SIZES.barHeight,
    gap = SIZES.cutoutGap,
    color = THEME.surface,
    leading,
    trailing,
  }: ICutoutSurface) => {
    const [content, setContent] = useState(0);

    const onTrailingLayout = useCallback((event: LayoutChangeEvent) => {
      setContent(event.nativeEvent.layout.width);
    }, []);

    const shapes = useMemo(() => {
      const pillWidth = content > 0 ? content + TRAIL_PAD * 2 : 0;

      const arm = Skia.Path.Make();
      arm.addRRect(rrect(rect(0, 0, width, height), height / 2, height / 2));

      if (pillWidth <= 0) {
        return { arm, pill: null };
      }

      const pill = Skia.Path.Make();
      pill.addRRect(
        rrect(
          rect(width - pillWidth, 0, pillWidth, height),
          height / 2,
          height / 2,
        ),
      );

      const bite = Skia.Path.Make();
      const biteHeight = height + gap * 2;
      bite.addRRect(
        rrect(
          rect(width - pillWidth - gap, -gap, pillWidth + gap * 2, biteHeight),
          biteHeight / 2,
          biteHeight / 2,
        ),
      );

      return {
        arm: Skia.Path.MakeFromOp(arm, bite, PathOp.Difference) ?? arm,
        pill,
      };
    }, [width, height, gap, content]);

    return (
      <View style={[styles.surface, { width, height }]}>
        <Canvas pointerEvents="none" style={styles.canvas}>
          <Group transform={[{ translateX: PAD }, { translateY: PAD }]}>
            <Path path={shapes.arm} color={color}>
              <Shadow dx={0} dy={6} blur={10} color={THEME.shadow} />
            </Path>
            {shapes.pill ? (
              <Path path={shapes.pill} color={color}>
                <Shadow dx={0} dy={6} blur={10} color={THEME.shadow} />
              </Path>
            ) : null}
          </Group>
        </Canvas>

        <View style={styles.leading}>{leading}</View>
        <View style={styles.trailing} onLayout={onTrailingLayout}>
          {trailing}
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  surface: {
    justifyContent: "center",
  },
  canvas: {
    position: "absolute",
    top: -PAD,
    left: -PAD,
    right: -PAD,
    bottom: -PAD,
  },
  leading: {
    position: "absolute",
    left: LEAD_PAD,
  },
  trailing: {
    position: "absolute",
    right: TRAIL_PAD,
  },
});

export { CutoutSurface };
export type { ICutoutSurface };
