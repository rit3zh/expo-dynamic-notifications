import { Image } from "expo-image";
import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { THEME } from "./theme";
import type { IReactor } from "./types";

interface IAvatarStack {
  reactors: IReactor[];
  size?: number;
  overlap?: number;
}

const AvatarStack: React.FC<IAvatarStack> &
  React.FunctionComponent<IAvatarStack> = memo<IAvatarStack>(
  ({ reactors, size = 26, overlap = 9 }: IAvatarStack) => {
    return (
      <View style={styles.row}>
        {reactors.map((reactor, index) => (
          <Image
            key={reactor.id}
            source={{ uri: reactor.avatar }}
            contentFit="cover"
            transition={200}
            cachePolicy="memory-disk"
            style={[
              styles.avatar,
              {
                width: size,
                height: size,
                borderRadius: size / 2,
                marginLeft: index === 0 ? 0 : -overlap,
                zIndex: reactors.length - index,
              },
            ]}
          />
        ))}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    borderWidth: 2,
    borderColor: THEME.surface,
    backgroundColor: THEME.soft,
  },
});

export { AvatarStack };
export type { IAvatarStack };
