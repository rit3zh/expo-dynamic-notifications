import { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { rounded } from "./fonts";
import { Glyph } from "./glyph";
import { SIZES, THEME } from "./theme";

interface ISectionTitle {
  lead: string;
  trail: string;
  action?: string;
  onAction?: () => void;
}

const SectionTitle: React.FC<ISectionTitle> &
  React.FunctionComponent<ISectionTitle> = memo<ISectionTitle>(
  ({ lead, trail, action, onAction }: ISectionTitle) => {
    return (
      <View style={styles.row}>
        <Text style={styles.lead}>
          {lead} <Text style={styles.trail}>{trail}</Text>
        </Text>

        {action ? (
          <Pressable
            onPress={onAction}
            hitSlop={8}
            style={({ pressed }) => [styles.action, pressed && styles.pressed]}
          >
            <Text style={styles.actionLabel}>{action}</Text>
            <Glyph
              name={{
                ios: "chevron.right",
                android: "chevron_right",
                web: "chevron_right",
              }}
              size={11}
              color={THEME.accent}
            />
          </Pressable>
        ) : null}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: SIZES.gutter,
  },
  lead: {
    ...rounded("800"),
    flex: 1,
    fontSize: 17,
    letterSpacing: -0.4,
    color: THEME.ink,
  },
  trail: {
    ...rounded("600"),
    color: THEME.muted,
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  actionLabel: {
    ...rounded("700"),
    fontSize: 12.5,
    letterSpacing: -0.2,
    color: THEME.accent,
  },
  pressed: {
    opacity: 0.6,
  },
});

export { SectionTitle };
export type { ISectionTitle };
