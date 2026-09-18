import type { SharedValue } from "react-native-reanimated";
import type { IDynamicNotification } from "./dynamic-notification.interface";

interface INotificationTimeline {
  drop: SharedValue<number>;
  expand: SharedValue<number>;
  reveal: SharedValue<number>;
  tint: SharedValue<number>;
  dragY: SharedValue<number>;
  notification: IDynamicNotification | null;
  isVisible: boolean;
  trigger: (notification: IDynamicNotification) => void;
  dismiss: () => void;
}

interface INotificationTimelineOptions {
  onDismiss?: (notification: IDynamicNotification) => void;
  duration?: number | null;
}

export type { INotificationTimeline, INotificationTimelineOptions };
