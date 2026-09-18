import { memo } from "react";
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Path,
  RadialGradient,
  Stop,
} from "react-native-svg";
import { STAR_GLOW, STAR_SHEEN, STAR_STOPS } from "./theme";

interface IGlowStar {
  size?: number;
  glow?: boolean;
}

const SPARKLE =
  "M50 3 C53 33 67 47 97 50 C67 53 53 67 50 97 C47 67 33 53 3 50 C33 47 47 33 50 3 Z";

const SPEC =
  "M84 12 C85 21 89 25 98 26 C89 27 85 31 84 40 C83 31 79 27 70 26 C79 25 83 21 84 12 Z";

const GlowStar: React.FC<IGlowStar> & React.FunctionComponent<IGlowStar> =
  memo<IGlowStar>(({ size = 34, glow = true }: IGlowStar) => {
    return (
      <Svg width={size} height={size} viewBox="0 0 100 100">
        <Defs>
          <LinearGradient id="star" x1="0.86" y1="0.06" x2="0.14" y2="0.96">
            {STAR_STOPS.map((stop) => (
              <Stop
                key={stop.offset}
                offset={stop.offset}
                stopColor={stop.color}
              />
            ))}
          </LinearGradient>

          <RadialGradient id="sheen" cx="0.44" cy="0.4" r="0.42">
            <Stop offset="0" stopColor={STAR_SHEEN} stopOpacity={0.62} />
            <Stop offset="0.5" stopColor={STAR_SHEEN} stopOpacity={0.16} />
            <Stop offset="1" stopColor={STAR_SHEEN} stopOpacity={0} />
          </RadialGradient>

          <RadialGradient id="bloom" cx="0.5" cy="0.5" r="0.5">
            <Stop offset="0" stopColor={STAR_GLOW} stopOpacity={0.42} />
            <Stop offset="0.55" stopColor={STAR_GLOW} stopOpacity={0.14} />
            <Stop offset="1" stopColor={STAR_GLOW} stopOpacity={0} />
          </RadialGradient>

          <RadialGradient id="core" cx="0.5" cy="0.5" r="0.5">
            <Stop offset="0" stopColor={STAR_SHEEN} stopOpacity={0.9} />
            <Stop offset="0.4" stopColor={STAR_GLOW} stopOpacity={0.42} />
            <Stop offset="1" stopColor={STAR_GLOW} stopOpacity={0} />
          </RadialGradient>
        </Defs>

        {glow ? (
          <>
            <Circle cx={50} cy={50} r={50} fill="url(#bloom)" />
            <Circle cx={50} cy={50} r={28} fill="url(#core)" />
          </>
        ) : null}

        <Path d={SPARKLE} fill="url(#star)" />
        <Path d={SPARKLE} fill="url(#sheen)" />

        <Path d={SPEC} fill="url(#star)" opacity={0.85} />
      </Svg>
    );
  });

export { GlowStar };
export type { IGlowStar };
