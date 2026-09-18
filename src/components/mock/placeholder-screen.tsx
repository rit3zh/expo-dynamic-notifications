import { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Glyph } from "./glyph";
import { THEME } from "./theme";
import type { GlyphName } from "./types";

interface IPlaceholderScreen {
  title: string;
  hint: string;
  icon: GlyphName;
}

const PlaceholderScreen: React.FC<IPlaceholderScreen> &
  React.FunctionComponent<IPlaceholderScreen> = memo<IPlaceholderScreen>(
  ({ title, hint, icon }: IPlaceholderScreen) => {
    return (
      <View style={styles.screen}>
        <View style={styles.badge}>
          <Glyph name={icon} size={26} color={THEME.accent} />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.hint}>{hint}</Text>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingHorizontal: 40,
    backgroundColor: THEME.bg,
  },
  badge: {
    width: 62,
    height: 62,
    borderRadius: 31,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: THEME.accentSoft,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.5,
    color: THEME.ink,
  },
  hint: {
    textAlign: "center",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
    color: THEME.muted,
  },
});

export { PlaceholderScreen };
export type { IPlaceholderScreen };
