import type { SharedValue } from "react-native-reanimated";
import type { IDynamicNotification } from "./dynamic-notification.interface";
import type { INotificationLayout } from "./notification-layout.interface";

interface IDynamicNotificationsTheme {
  islandColor: string;
  cardColor: string;
  shadowColor: string;
  accent: string;
  blur: number;
  gain: number;
  threshold: number;
}

interface IDynamicNotificationsContext extends IDynamicNotificationsTheme {
  trigger: (notification: IDynamicNotification) => void;
  dismiss: () => void;
  isVisible: boolean;
  notification: IDynamicNotification | null;
  layout: INotificationLayout;
  drop: SharedValue<number>;
  expand: SharedValue<number>;
  reveal: SharedValue<number>;
  tint: SharedValue<number>;
  dragY: SharedValue<number>;
}

export type { IDynamicNotificationsContext, IDynamicNotificationsTheme };
