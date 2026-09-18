import { memo } from "react";
import Svg, { Path } from "react-native-svg";
import { FEED } from "./theme";

interface IBellIcon {
  size?: number;
  color?: string;
}

const BODY =
  "M74.5789 186.671C76.2492 185.001 77.1875 182.735 77.1875 180.373V124.688C77.1875 88.6112 98.4556 65.3125 142.5 65.3125C186.544 65.3125 207.812 88.6112 207.812 124.688V180.373C207.812 182.735 208.751 185.001 210.421 186.671C216.032 192.282 212.058 201.875 204.123 201.875H80.8766C72.942 201.875 68.9683 192.282 74.5789 186.671Z";

const CLAPPER =
  "M123.912 213.875C118.451 213.875 114.613 219.423 118.39 223.367C123.894 229.112 132.196 231.688 142.5 231.688C152.804 231.688 161.106 229.112 166.61 223.367C170.387 219.423 166.549 213.875 161.088 213.875H123.912Z";

const VIEW_BOX = "56.5 62.5 172 172";

const BellIcon: React.FC<IBellIcon> & React.FunctionComponent<IBellIcon> =
  memo<IBellIcon>(({ size = 25, color = FEED.icon }: IBellIcon) => {
    return (
      <Svg width={size} height={size} viewBox={VIEW_BOX} fill={color}>
        <Path d={BODY} />
        <Path d={CLAPPER} />
      </Svg>
    );
  });

export { BellIcon };
export type { IBellIcon };
