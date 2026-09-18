import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import type { IDynamicNotification } from "./dynamic-notification.interface";

interface IDynamicNotifications {
  children: ReactNode;

  strength?: number;
  blur?: number;
  gain?: number;
  threshold?: number;

  islandWidth?: number;
  islandHeight?: number;
  islandTop?: number;
  islandColor?: string;

  cardWidth?: number;
  cardHeight?: number;
  cardRadius?: number;
  cardColor?: string;
  shadowColor?: string;
  accent?: string;

  gap?: number;
  duration?: number | null;

  style?: StyleProp<ViewStyle>;
  onDismiss?: (notification: IDynamicNotification) => void;
}

export type { IDynamicNotifications };
