import { memo } from "react";
import Svg, { Circle, Path } from "react-native-svg";
import { FEED } from "./theme";

interface ICommentIcon {
  size?: number;
  color?: string;
}

const BUBBLE =
  "M19.07 4.93a10 10 0 0 0-16.28 11 1.06 1.06 0 0 1 .09.64L2 20.8a1 1 0 0 0 .27.91A1 1 0 0 0 3 22h.2l4.28-.86a1.26 1.26 0 0 1 .64.09 10 10 0 0 0 11-16.28zm.83 8.36a8 8 0 0 1-11 6.08 3.26 3.26 0 0 0-1.25-.26 3.43 3.43 0 0 0-.56.05l-2.82.57.57-2.82a3.09 3.09 0 0 0-.21-1.81 8 8 0 0 1 6.08-11 8 8 0 0 1 9.19 9.19z";

const CommentIcon: React.FC<ICommentIcon> &
  React.FunctionComponent<ICommentIcon> = memo<ICommentIcon>(
  ({ size = 21, color = FEED.iconSoft }: ICommentIcon) => {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <Circle cx={8} cy={12} r={1} />
        <Circle cx={12} cy={12} r={1} />
        <Circle cx={16} cy={12} r={1} />
        <Path d={BUBBLE} />
      </Svg>
    );
  },
);

export { CommentIcon };
export type { ICommentIcon };
