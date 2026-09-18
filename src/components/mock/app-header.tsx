import { memo, type RefObject } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Glyph } from "./glyph";
import { LiquidButton } from "./liquid-button";
import { SparkMark } from "./spark-mark";
import { FEED, FEED_SIZES } from "./theme";

interface IAppHeader {
  top: number;
  blurTarget?: RefObject<View | null>;
  onMenu: () => void;
  onMark: () => void;
  onBell: () => void;
}

const AppHeader: React.FC<IAppHeader> & React.FunctionComponent<IAppHeader> =
  memo<IAppHeader>(
    ({ top, blurTarget, onMenu, onMark, onBell }: IAppHeader) => {
      return (
        <View pointerEvents="box-none" style={[styles.header, { top }]}>
          <LiquidButton label="Menu" blurTarget={blurTarget} onPress={onMenu}>
            <Glyph
              name={{
                ios: "line.3.horizontal",
                android: "menu",
                web: "menu",
              }}
              size={25}
              color={FEED.icon}
              weight="medium"
            />
          </LiquidButton>

          <Pressable
            onPress={onMark}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel="Refresh feed"
            style={({ pressed }) => [pressed && styles.pressed]}
          >
            <SparkMark />
          </Pressable>

          <LiquidButton
            label="Notifications"
            blurTarget={blurTarget}
            onPress={onBell}
          >
            <Glyph
              name={{
                ios: "bell.fill",
                android: "notifications",
                web: "notifications",
              }}
              size={25}
              color={FEED.icon}
            />
          </LiquidButton>
        </View>
      );
    },
  );

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    left: FEED_SIZES.gutter,
    right: FEED_SIZES.gutter,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.92 }],
  },
});

export { AppHeader };
export type { IAppHeader };
