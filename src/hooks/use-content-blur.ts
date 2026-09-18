import { BLUR_INTENSITY } from "@/constants/notification.consts";
import { clamp } from "@/logic/clamp.default";
import type { SharedValue } from "react-native-reanimated";
import { useAnimatedProps, useAnimatedStyle } from "react-native-reanimated";

interface IUseContentBlur {
  reveal: SharedValue<number>;
}

const useContentBlur = ({ reveal }: IUseContentBlur) => {
  const animatedProps = useAnimatedProps(() => {
    const progress = clamp(reveal.value, 0, 1);

    return { intensity: BLUR_INTENSITY * (1 - progress) };
  });

  const animatedStyle = useAnimatedStyle(() => {
    return { opacity: 1 - clamp(reveal.value, 0, 1) };
  });

  return { animatedProps, animatedStyle };
};

export { useContentBlur };
export type { IUseContentBlur };
