import type { GlyphName } from "./types";
import { SymbolView } from "expo-symbols";
import { memo } from "react";
import type { ColorValue } from "react-native";

interface IGlyph {
  name: GlyphName;
  size?: number;
  color?: ColorValue;
  weight?: "regular" | "medium" | "semibold" | "bold";
}

const Glyph: React.FC<IGlyph> & React.FunctionComponent<IGlyph> = memo<IGlyph>(
  ({ name, size = 22, color = "#15141A", weight = "semibold" }: IGlyph) => {
    return (
      <SymbolView
        name={name}
        size={size}
        tintColor={color}
        weight={weight}
        fallback={null}
      />
    );
  },
);

export { Glyph };
export type { IGlyph };
