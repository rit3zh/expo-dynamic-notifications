import type { DerivedValue, SharedValue } from "react-native-reanimated";
import type { INotificationLayout } from "./notification-layout.interface";

interface IBuildNotificationGeometry {
  drop: number;
  expand: number;
  layout: INotificationLayout;
}

interface INotificationGeometry {
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
  neckX: number;
  neckY: number;
  neckWidth: number;
  neckHeight: number;
  neckRadius: number;
  shadowOpacity: number;
  offsetY: number;
  widthRatio: number;
}

interface INotificationGeometryInput {
  drop: SharedValue<number>;
  expand: SharedValue<number>;
  layout: INotificationLayout;
}

type INotificationGeometryValues = {
  [K in keyof INotificationGeometry]: DerivedValue<number>;
};

export type {
  IBuildNotificationGeometry,
  INotificationGeometry,
  INotificationGeometryInput,
  INotificationGeometryValues,
};
