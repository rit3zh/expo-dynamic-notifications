import { Image } from "expo-image";
import { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { rounded } from "./fonts";
import { GlassSurface } from "./glass-surface";
import { PhotoScrim } from "./photo-scrim";
import { SIZES, THEME } from "./theme";
import type { ILive } from "./types";

interface ILiveCard {
  room: ILive;
  width?: number;
  height?: number;
  onOpen: () => void;
  onFollow: () => void;
}

const LiveCard: React.FC<ILiveCard> & React.FunctionComponent<ILiveCard> =
  memo<ILiveCard>(
    ({
      room,
      width = SIZES.liveWidth,
      height = SIZES.liveHeight,
      onOpen,
      onFollow,
    }: ILiveCard) => {
      return (
        <Pressable
          onPress={onOpen}
          style={({ pressed }) => [
            styles.card,
            { width, height },
            pressed && styles.pressed,
          ]}
        >
          <Image
            source={{ uri: room.image }}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
            transition={320}
            cachePolicy="memory-disk"
          />

          <PhotoScrim width={width} height={height} />

          <View style={styles.top}>
            <View style={styles.liveTag}>
              <Text style={styles.liveLabel}>LIVE</Text>
            </View>

            <Pressable
              onPress={onFollow}
              hitSlop={8}
              style={({ pressed }) => [pressed && styles.pressed]}
            >
              <GlassSurface
                tone="dark"
                radius={13}
                interactive
                style={styles.follow}
              >
                <Text
                  style={[
                    styles.followLabel,
                    room.following && styles.followingLabel,
                  ]}
                >
                  {room.following ? "Following" : "Follow"}
                </Text>
              </GlassSurface>
            </Pressable>
          </View>

          <View style={styles.footer}>
            <Text style={styles.title} numberOfLines={1}>
              {room.title}
            </Text>
            <Text style={styles.meta} numberOfLines={1}>
              {room.host} · {room.viewers} watching
            </Text>
          </View>
        </Pressable>
      );
    },
  );

const styles = StyleSheet.create({
  card: {
    borderRadius: SIZES.liveRadius,
    borderCurve: "continuous",
    overflow: "hidden",
    backgroundColor: THEME.soft,
    justifyContent: "space-between",
  },
  pressed: {
    opacity: 0.86,
  },
  top: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  liveTag: {
    paddingHorizontal: 9,
    height: 22,
    justifyContent: "center",
    borderRadius: 11,
    backgroundColor: THEME.live,
  },
  liveLabel: {
    ...rounded("800"),
    fontSize: 9.5,
    letterSpacing: 0.5,
    color: THEME.surface,
  },
  follow: {
    paddingHorizontal: 11,
    height: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  followLabel: {
    ...rounded("700"),
    fontSize: 11.5,
    letterSpacing: -0.1,
    color: THEME.accentLift,
  },
  followingLabel: {
    color: "rgba(255,255,255,0.72)",
  },
  footer: {
    padding: 12,
    gap: 3,
  },
  title: {
    ...rounded("700"),
    fontSize: 16,
    letterSpacing: -0.35,
    color: THEME.surface,
  },
  meta: {
    ...rounded("500"),
    fontSize: 11.5,
    letterSpacing: -0.1,
    color: "rgba(255,255,255,0.78)",
  },
});

export { LiveCard };
export type { ILiveCard };
