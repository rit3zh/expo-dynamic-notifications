import { buildNotificationGeometry } from "@/core/build-notification-geometry";
import type {
  INotificationGeometryInput,
  INotificationGeometryValues,
} from "@/interfaces/notification-geometry.interface";
import { useDerivedValue } from "react-native-reanimated";

const useNotificationGeometry = ({
  drop,
  expand,
  layout,
}: INotificationGeometryInput): INotificationGeometryValues => {
  const geometry = useDerivedValue(() =>
    buildNotificationGeometry({
      drop: drop.value,
      expand: expand.value,
      layout,
    }),
  );

  const x = useDerivedValue(() => geometry.value.x);
  const y = useDerivedValue(() => geometry.value.y);
  const width = useDerivedValue(() => geometry.value.width);
  const height = useDerivedValue(() => geometry.value.height);
  const radius = useDerivedValue(() => geometry.value.radius);
  const neckX = useDerivedValue(() => geometry.value.neckX);
  const neckY = useDerivedValue(() => geometry.value.neckY);
  const neckWidth = useDerivedValue(() => geometry.value.neckWidth);
  const neckHeight = useDerivedValue(() => geometry.value.neckHeight);
  const neckRadius = useDerivedValue(() => geometry.value.neckRadius);
  const shadowOpacity = useDerivedValue(() => geometry.value.shadowOpacity);
  const offsetY = useDerivedValue(() => geometry.value.offsetY);
  const widthRatio = useDerivedValue(() => geometry.value.widthRatio);

  return {
    x,
    y,
    width,
    height,
    radius,
    neckX,
    neckY,
    neckWidth,
    neckHeight,
    neckRadius,
    shadowOpacity,
    offsetY,
    widthRatio,
  };
};

export { useNotificationGeometry };
