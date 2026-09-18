import {
  Canvas,
  LinearGradient,
  Rect,
  vec,
} from "@shopify/react-native-skia";
import { memo } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { HEADER_GRADIENT, SIZES } from "./theme";

interface IHeaderGradient {
  height?: number;
}

const HeaderGradient: React.FC<IHeaderGradient> &
  React.FunctionComponent<IHeaderGradient> = memo<IHeaderGradient>(
  ({ height = SIZES.headerFade }: IHeaderGradient) => {
    const { width } = useWindowDimensions();

    return (
      <Canvas pointerEvents="none" style={[styles.canvas, { height }]}>
        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(0, height)}
            colors={[...HEADER_GRADIENT]}
            positions={[0, 0.42, 0.76, 1]}
          />
        </Rect>
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

export { HeaderGradient };
export type { IHeaderGradient };
