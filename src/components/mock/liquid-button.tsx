import { BlurView } from "expo-blur";
import {
  GlassView,
  isGlassEffectAPIAvailable,
  isLiquidGlassAvailable,
} from "expo-glass-effect";
import { memo, type ReactNode, type RefObject } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { FEED, FEED_SIZES } from "./theme";

interface ILiquidButton {
  children: ReactNode;
  onPress?: () => void;
  size?: number;
  label?: string;
  blurTarget?: RefObject<View | null>;
}

const LIQUID = isLiquidGlassAvailable() && isGlassEffectAPIAvailable();

const LiquidButton: React.FC<ILiquidButton> &
  React.FunctionComponent<ILiquidButton> = memo<ILiquidButton>(
  ({
    children,
    onPress,
    size = FEED_SIZES.control,
    label,
    blurTarget,
  }: ILiquidButton) => {
    const disc = { width: size, height: size, borderRadius: size / 2 };

    if (LIQUID) {
      return (
        <Pressable
          onPress={onPress}
          hitSlop={6}
          accessibilityRole="button"
          accessibilityLabel={label}
        >
          <GlassView
            glassEffectStyle="clear"
            isInteractive
            tintColor={FEED.glassTint}
            style={[styles.center, disc]}
          >
            {children}
          </GlassView>
        </Pressable>
      );
    }

    return (
      <Pressable
        onPress={onPress}
        hitSlop={6}
        accessibilityRole="button"
        accessibilityLabel={label}
        style={({ pressed }) => [
          styles.center,
          styles.shadow,
          disc,
          pressed && styles.pressed,
        ]}
      >
        <BlurView
          tint="light"
          intensity={40}
          blurTarget={blurTarget}
          blurMethod="dimezisBlurViewSdk31Plus"
          style={[StyleSheet.absoluteFill, styles.clip, disc]}
        />
        <View
          pointerEvents="none"
          style={[StyleSheet.absoluteFill, styles.fill, disc]}
        />
        {children}
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  shadow: {
    boxShadow: `0px 6px 18px ${FEED.shadow}`,
  },
  clip: {
    overflow: "hidden",
  },
  fill: {
    backgroundColor: FEED.frost,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: FEED.frostEdge,
  },
  pressed: {
    transform: [{ scale: 0.93 }],
  },
});

export { LIQUID, LiquidButton };
export type { ILiquidButton };
