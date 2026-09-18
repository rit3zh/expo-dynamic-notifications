import { DRAG_SPRING } from "@/conf/springs";
import {
  SWIPE_DISTANCE,
  SWIPE_VELOCITY,
} from "@/constants/notification.consts";
import { clamp } from "@/logic/clamp.default";
import { useMemo } from "react";
import { Gesture } from "react-native-gesture-handler";
import type { SharedValue } from "react-native-reanimated";
import { withSpring } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

interface IUseDismissGesture {
  offset: SharedValue<number>;
  onDismiss: () => void;
  onPress?: () => void;
}

const useDismissGesture = ({
  offset,
  onDismiss,
  onPress,
}: IUseDismissGesture) => {
  return useMemo(() => {
    const pan = Gesture.Pan()
      .onChange((event) => {
        offset.value = clamp(offset.value + event.changeY, -120, 24);
      })
      .onEnd((event) => {
        const thrown =
          offset.value < SWIPE_DISTANCE || event.velocityY < SWIPE_VELOCITY;

        if (thrown) {
          scheduleOnRN(onDismiss);
          return;
        }

        offset.value = withSpring(0, DRAG_SPRING);
      });

    const tap = Gesture.Tap().onEnd((_event, success) => {
      if (!success) {
        return;
      }

      if (onPress) {
        scheduleOnRN(onPress);
      }

      scheduleOnRN(onDismiss);
    });

    return Gesture.Exclusive(pan, tap);
  }, [offset, onDismiss, onPress]);
};

export { useDismissGesture };
export type { IUseDismissGesture };
