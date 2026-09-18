import { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { rounded } from "./fonts";
import { GlassSurface } from "./glass-surface";
import { Glyph } from "./glyph";
import { SIZES, THEME } from "./theme";
import type { GlyphName } from "./types";

interface IGlassButton {
  icon: GlyphName;
  onPress?: () => void;
  badge?: string;
  dot?: boolean;
  tone?: "light" | "dark";
  size?: number;
}

const GlassButton: React.FC<IGlassButton> &
  React.FunctionComponent<IGlassButton> = memo<IGlassButton>(
  ({
    icon,
    onPress,
    badge,
    dot,
    tone = "light",
    size = SIZES.control,
  }: IGlassButton) => {
    const dark = tone === "dark";

    return (
      <Pressable
        onPress={onPress}
        hitSlop={8}
        style={({ pressed }) => [pressed && styles.pressed]}
      >
        <GlassSurface
          tone={tone}
          radius={size / 2}
          interactive
          style={{
            width: size,
            height: size,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Glyph
            name={icon}
            size={Math.round(size * 0.44)}
            color={dark ? THEME.surface : THEME.ink}
          />
        </GlassSurface>

        {badge ? (
          <View style={styles.badge}>
            <Text style={styles.badgeLabel}>{badge}</Text>
          </View>
        ) : null}

        {!badge && dot ? <View style={styles.dot} /> : null}
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.94 }],
  },
  badge: {
    position: "absolute",
    top: -2,
    right: -3,
    minWidth: 17,
    height: 17,
    paddingHorizontal: 4,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: THEME.accent,
    borderWidth: 1.5,
    borderColor: THEME.surface,
  },
  badgeLabel: {
    ...rounded("800"),
    fontSize: 9.5,
    color: THEME.surface,
  },
  dot: {
    position: "absolute",
    top: 1,
    right: 1,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: THEME.accent,
    borderWidth: 2,
    borderColor: THEME.surface,
  },
});

export { GlassButton };
export type { IGlassButton };
