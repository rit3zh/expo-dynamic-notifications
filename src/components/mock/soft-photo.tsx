import { Image } from "expo-image";
import { memo, type ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { FEED } from "./theme";

interface ISoftPhoto {
  uri: string;
  width: number;
  height: number;
  radius: number;
  glow?: number;
  blur?: number;
  children?: ReactNode;
}

const SoftPhoto: React.FC<ISoftPhoto> & React.FunctionComponent<ISoftPhoto> =
  memo<ISoftPhoto>(
    ({ uri, width, height, radius, glow = 14, blur, children }: ISoftPhoto) => {
      return (
        <View style={[styles.frame, { width, height, borderRadius: radius }]}>
          <Image
            source={{ uri }}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
            blurRadius={blur}
            transition={320}
            cachePolicy="memory-disk"
          />
          <View
            pointerEvents="none"
            style={[
              StyleSheet.absoluteFill,
              styles.edge,
              {
                borderRadius: radius,
                boxShadow: `inset 0px 0px ${glow}px ${glow / 5}px ${FEED.glow}`,
              },
            ]}
          />
          {children}
        </View>
      );
    },
  );

const styles = StyleSheet.create({
  frame: {
    overflow: "hidden",
    borderCurve: "continuous",
    backgroundColor: FEED.placeholder,
  },
  edge: {
    borderCurve: "continuous",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
});

export { SoftPhoto };
export type { ISoftPhoto };
