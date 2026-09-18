import {
  Canvas,
  LinearGradient,
  Rect,
  vec,
} from "@shopify/react-native-skia";
import { memo } from "react";
import { StyleSheet } from "react-native";

interface IPhotoScrim {
  width: number;
  height: number;
  top?: boolean;
}

const PhotoScrim: React.FC<IPhotoScrim> & React.FunctionComponent<IPhotoScrim> =
  memo<IPhotoScrim>(({ width, height, top = false }: IPhotoScrim) => {
    const bottomStart = height * 0.4;
    const topEnd = height * 0.26;

    return (
      <Canvas pointerEvents="none" style={StyleSheet.absoluteFill}>
        {top ? (
          <Rect x={0} y={0} width={width} height={topEnd}>
            <LinearGradient
              start={vec(0, 0)}
              end={vec(0, topEnd)}
              colors={["rgba(9, 8, 13, 0.52)", "rgba(9, 8, 13, 0)"]}
            />
          </Rect>
        ) : null}

        <Rect
          x={0}
          y={bottomStart}
          width={width}
          height={height - bottomStart}
        >
          <LinearGradient
            start={vec(0, bottomStart)}
            end={vec(0, height)}
            colors={["rgba(9, 8, 13, 0)", "rgba(9, 8, 13, 0.7)"]}
          />
        </Rect>
      </Canvas>
    );
  });

export { PhotoScrim };
export type { IPhotoScrim };
