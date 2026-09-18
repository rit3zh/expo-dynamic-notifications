import { memo, useId } from "react";
import Svg, {
  Defs,
  LinearGradient,
  Path,
  RadialGradient,
  Stop,
} from "react-native-svg";
import { FEED, FEED_SIZES, STAR_SHEEN, STAR_STOPS } from "./theme";

interface ISparkMark {
  size?: number;
}

const CX = 45;
const CY = 55;

const POINTS = 12;
const INNER = 25;

const OUTER = [39, 35, 38, 34, 39, 36, 34, 39, 35, 38, 34, 37];

const BURST = (() => {
  const step = Math.PI / POINTS;
  const vertices = Array.from({ length: POINTS * 2 }, (_, index) => {
    const radius = index % 2 === 0 ? OUTER[index / 2] : INNER;
    const angle = index * step - Math.PI / 2;
    const x = (CX + radius * Math.cos(angle)).toFixed(2);
    const y = (CY + radius * Math.sin(angle)).toFixed(2);
    return `${index === 0 ? "M" : "L"}${x} ${y}`;
  });

  return `${vertices.join(" ")} Z`;
})();

const sparkle = (cx: number, cy: number, r: number) => {
  const a = (r * 3) / 47;
  const b = (r * 17) / 47;
  return [
    `M${cx} ${cy - r}`,
    `C${cx + a} ${cy - b} ${cx + b} ${cy - a} ${cx + r} ${cy}`,
    `C${cx + b} ${cy + a} ${cx + a} ${cy + b} ${cx} ${cy + r}`,
    `C${cx - a} ${cy + b} ${cx - b} ${cy + a} ${cx - r} ${cy}`,
    `C${cx - b} ${cy - a} ${cx - a} ${cy - b} ${cx} ${cy - r}`,
    "Z",
  ].join(" ");
};

const CORE = sparkle(CX, CY, 17);

const SPEC = sparkle(85, 15, 12);

const SparkMark: React.FC<ISparkMark> & React.FunctionComponent<ISparkMark> =
  memo<ISparkMark>(({ size = FEED_SIZES.mark }: ISparkMark) => {
    const id = useId().replace(/:/g, "");
    const ramp = `ramp-${id}`;
    const sheen = `sheen-${id}`;

    return (
      <Svg width={size} height={size} viewBox="0 0 100 100">
        <Defs>
          <LinearGradient id={ramp} x1="0.9" y1="0.04" x2="0.1" y2="0.96">
            {STAR_STOPS.map((stop) => (
              <Stop
                key={stop.offset}
                offset={stop.offset}
                stopColor={stop.color}
              />
            ))}
          </LinearGradient>

          <RadialGradient id={sheen} cx="0.38" cy="0.42" r="0.4">
            <Stop offset="0" stopColor={STAR_SHEEN} stopOpacity={0.5} />
            <Stop offset="0.6" stopColor={STAR_SHEEN} stopOpacity={0.1} />
            <Stop offset="1" stopColor={STAR_SHEEN} stopOpacity={0} />
          </RadialGradient>
        </Defs>

        <Path
          d={BURST}
          fill={`url(#${ramp})`}
          stroke={`url(#${ramp})`}
          strokeWidth={6}
          strokeLinejoin="round"
        />
        <Path d={BURST} fill={`url(#${sheen})`} />

        <Path d={CORE} fill={STAR_SHEEN} opacity={0.95} />

        <Path
          d={SPEC}
          fill={`url(#${ramp})`}
          stroke={FEED.bg}
          strokeWidth={4}
          strokeLinejoin="round"
        />
      </Svg>
    );
  });

export { SparkMark };
export type { ISparkMark };
