import { PALETTE } from "@/conf/palette";
import {
  GOO_BLUR_MAX,
  GOO_BLUR_MIN,
  GOO_GAIN,
  GOO_STRENGTH,
  GOO_THRESHOLD,
} from "@/constants/notification.consts";
import { DynamicNotificationsContext } from "@/context";
import { getNotificationLayout } from "@/helpers";
import { useNotificationTimeline } from "@/hooks/use-notification-timeline";
import type { IDynamicNotifications } from "@/interfaces/dynamic-notifications.interface";
import { clamp } from "@/logic/clamp.default";
import { mix } from "@/logic/mix.default";
import { memo, useMemo } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Overlay } from "./overlay";

const Root: React.FC<IDynamicNotifications> &
  React.FunctionComponent<IDynamicNotifications> = memo<IDynamicNotifications>(
  ({
    children,
    strength = GOO_STRENGTH,
    blur,
    gain = GOO_GAIN,
    threshold = GOO_THRESHOLD,
    islandWidth,
    islandHeight,
    islandTop,
    islandColor = PALETTE.island,
    cardWidth,
    cardHeight,
    cardRadius,
    cardColor = PALETTE.card,
    shadowColor = PALETTE.shadow,
    accent = PALETTE.accent,
    gap,
    duration,
    style,
    onDismiss,
  }: IDynamicNotifications):
    | (React.ReactNode & React.ReactElement & React.JSX.Element)
    | null => {
    const { width } = useWindowDimensions();
    const insets = useSafeAreaInsets();

    const layout = useMemo(
      () =>
        getNotificationLayout({
          width,
          insetTop: insets.top,
          islandWidth,
          islandHeight,
          islandTop,
          cardWidth,
          cardHeight,
          cardRadius,
          gap,
        }),
      [
        width,
        insets.top,
        islandWidth,
        islandHeight,
        islandTop,
        cardWidth,
        cardHeight,
        cardRadius,
        gap,
      ],
    );

    const radius = useMemo(
      () => blur ?? mix(clamp(strength, 0, 1), GOO_BLUR_MIN, GOO_BLUR_MAX),
      [blur, strength],
    );

    const timeline = useNotificationTimeline({ onDismiss, duration });

    const value = useMemo(
      () => ({
        trigger: timeline.trigger,
        dismiss: timeline.dismiss,
        isVisible: timeline.isVisible,
        notification: timeline.notification,
        drop: timeline.drop,
        expand: timeline.expand,
        reveal: timeline.reveal,
        tint: timeline.tint,
        dragY: timeline.dragY,
        layout,
        islandColor,
        cardColor,
        shadowColor,
        accent,
        blur: radius,
        gain,
        threshold,
      }),
      [
        timeline.trigger,
        timeline.dismiss,
        timeline.isVisible,
        timeline.notification,
        timeline.drop,
        timeline.expand,
        timeline.reveal,
        timeline.tint,
        timeline.dragY,
        layout,
        islandColor,
        cardColor,
        shadowColor,
        accent,
        radius,
        gain,
        threshold,
      ],
    );

    return (
      <DynamicNotificationsContext.Provider value={value}>
        <View style={[styles.root, style]}>
          {children}
          <Overlay />
        </View>
      </DynamicNotificationsContext.Provider>
    );
  },
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export { Root };
