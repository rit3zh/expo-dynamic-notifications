import { memo } from "react";
import Svg, { Path } from "react-native-svg";
import { FEED, FEED_SIZES } from "./theme";

interface IFeedMark {
  size?: number;
  color?: string;
}

const POINTS = 12;
const INNER = 29;

const OUTER = [46, 42, 45, 40, 46, 43, 41, 46, 42, 45, 40, 44];

const BURST = (() => {
  const step = Math.PI / POINTS;
  const vertices = Array.from({ length: POINTS * 2 }, (_, index) => {
    const radius = index % 2 === 0 ? OUTER[index / 2] : INNER;
    const angle = index * step - Math.PI / 2;
    const x = (50 + radius * Math.cos(angle)).toFixed(2);
    const y = (50 + radius * Math.sin(angle)).toFixed(2);
    return `${index === 0 ? "M" : "L"}${x} ${y}`;
  });

  return `${vertices.join(" ")} Z`;
})();

const FeedMark: React.FC<IFeedMark> & React.FunctionComponent<IFeedMark> =
  memo<IFeedMark>(({ size = FEED_SIZES.mark, color = FEED.ink }: IFeedMark) => {
    return (
      <Svg width={size} height={size} viewBox="0 0 100 100">
        <Path
          d={BURST}
          fill={color}
          stroke={color}
          strokeWidth={6}
          strokeLinejoin="round"
        />
      </Svg>
    );
  });

export { FeedMark };
export type { IFeedMark };
