import { BlurView } from "expo-blur";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";
import { memo } from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";
import { THEME } from "./theme";

interface IGlassSurface {
  children?: React.ReactNode;
  tone?: "light" | "dark";
  radius?: number;
  intensity?: number;
  interactive?: boolean;
  style?: ViewStyle | ViewStyle[];
}

const LIQUID = isLiquidGlassAvailable();

const GlassSurface: React.FC<IGlassSurface> &
  React.FunctionComponent<IGlassSurface> = memo<IGlassSurface>(
  ({
    children,
    tone = "light",
    radius = 20,
    intensity = 34,
    interactive = false,
    style,
  }: IGlassSurface) => {
    const dark = tone === "dark";
    const shape: ViewStyle = {
      borderRadius: radius,
      borderCurve: "continuous",
      overflow: "hidden",
    };

    if (LIQUID) {
      return (
        <GlassView
          glassEffectStyle="clear"
          isInteractive={interactive}
          tintColor={dark ? "rgba(10, 24, 48, 0.22)" : "rgba(255,255,255,0.12)"}
          style={[shape, style]}
        >
          {children}
        </GlassView>
      );
    }

    return (
      <BlurView
        tint={dark ? "dark" : "light"}
        intensity={intensity}
        blurMethod="dimezisBlurView"
        style={[shape, style]}
      >
        <View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            shape,
            {
              backgroundColor: dark ? THEME.glassDark : THEME.glass,
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: dark ? THEME.glassDarkEdge : THEME.glassEdge,
            },
          ]}
        />
        {children}
      </BlurView>
    );
  },
);

export { GlassSurface, LIQUID };
export type { IGlassSurface };
