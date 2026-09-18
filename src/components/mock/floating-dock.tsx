import { Image } from "expo-image";
import { memo, type RefObject } from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import { Glyph } from "./glyph";
import { LiquidButton } from "./liquid-button";
import { FEED, FEED_SIZES } from "./theme";

interface IFloatingDock {
  bottom: number;
  avatar: string;
  blurTarget?: RefObject<View | null>;
  onDiscover: () => void;
  onCreate: () => void;
  onSearch: () => void;
  onProfile: () => void;
}

const ICON = 22;
const PHOTO = FEED_SIZES.dockAvatar - 5;

const CompassGlyph = () => (
  <Svg width={ICON} height={ICON} viewBox="0 0 24 24">
    <Path
      d="M12 2.5 L15.6 12 L12 21.5 L8.4 12 Z"
      fill={FEED.ink}
      stroke={FEED.ink}
      strokeWidth={1.4}
      strokeLinejoin="round"
      transform="rotate(45 12 12)"
    />
    <Circle cx={12} cy={12} r={1.7} fill={FEED.surface} />
  </Svg>
);

const FloatingDock: React.FC<IFloatingDock> &
  React.FunctionComponent<IFloatingDock> = memo<IFloatingDock>(
  ({
    bottom,
    avatar,
    blurTarget,
    onDiscover,
    onCreate,
    onSearch,
    onProfile,
  }: IFloatingDock) => {
    return (
      <View pointerEvents="box-none" style={[styles.dock, { bottom }]}>
        <View style={styles.group}>
          <LiquidButton
            size={FEED_SIZES.dock}
            label="Discover"
            blurTarget={blurTarget}
            onPress={onDiscover}
          >
            <CompassGlyph />
          </LiquidButton>

          <LiquidButton
            size={FEED_SIZES.dock}
            label="New post"
            blurTarget={blurTarget}
            onPress={onCreate}
          >
            <Glyph
              name={{
                ios: "photo.badge.plus",
                android: "add_photo_alternate",
                web: "add_photo_alternate",
              }}
              size={ICON}
              color={FEED.iconSoft}
              weight="regular"
            />
          </LiquidButton>

          <LiquidButton
            size={FEED_SIZES.dock}
            label="Search"
            blurTarget={blurTarget}
            onPress={onSearch}
          >
            <Glyph
              name={{
                ios: "text.magnifyingglass",
                android: "manage_search",
                web: "manage_search",
              }}
              size={ICON}
              color={FEED.iconSoft}
              weight="regular"
            />
          </LiquidButton>
        </View>

        <LiquidButton
          size={FEED_SIZES.dockAvatar}
          label="Profile"
          blurTarget={blurTarget}
          onPress={onProfile}
        >
          <Image
            source={{ uri: avatar }}
            style={styles.photo}
            contentFit="cover"
            transition={220}
            cachePolicy="memory-disk"
          />
        </LiquidButton>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  dock: {
    position: "absolute",
    left: FEED_SIZES.gutter,
    right: FEED_SIZES.gutter,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  group: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  photo: {
    width: PHOTO,
    height: PHOTO,
    borderRadius: PHOTO / 2,
    backgroundColor: FEED.placeholder,
  },
});

export { FloatingDock };
export type { IFloatingDock };
