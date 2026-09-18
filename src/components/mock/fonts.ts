import { Platform, type TextStyle } from "react-native";

const SERIF = "InstrumentSerif-Regular";
const SERIF_ITALIC = "InstrumentSerif-Italic";

const ROUNDED = Platform.select({
  ios: "SF Pro Rounded",
  default: undefined,
});

type Weight = NonNullable<TextStyle["fontWeight"]>;

const rounded = (weight: Weight = "600"): TextStyle => ({
  fontFamily: ROUNDED,
  fontWeight: weight,
});

const serif = (italic = false): TextStyle => ({
  fontFamily: italic ? SERIF_ITALIC : SERIF,
  fontWeight: "400",
});

const FONT_ASSETS = {
  [SERIF]: require("../../../assets/fonts/instrument-serif/InstrumentSerif-Regular.ttf"),
  [SERIF_ITALIC]: require("../../../assets/fonts/instrument-serif/InstrumentSerif-Italic.ttf"),
};

export { FONT_ASSETS, rounded, serif, SERIF, SERIF_ITALIC };
export type { Weight };
