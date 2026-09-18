import type { StyleProp, ViewStyle } from "react-native";
import type { IDynamicNotification } from "./dynamic-notification.interface";

interface INotificationContent {
  style?: StyleProp<ViewStyle>;
}

interface INotificationBody {
  notification: IDynamicNotification;
}

export type { INotificationBody, INotificationContent };
