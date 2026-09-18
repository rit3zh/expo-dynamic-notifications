# expo-dynamic-notifications

**Dynamic Island–style** in-app notifications for React Native.

---

## ⚙️ Installation

```bash
git clone https://github.com/rit3zh/expo-dynamic-notifications
cd expo-dynamic-notifications
bunx expo prebuild
bun install
bun ios
```

Peer dependencies (already set up in this template):

```bash
bun add @shopify/react-native-skia react-native-reanimated react-native-worklets react-native-gesture-handler react-native-safe-area-context expo-blur expo-image expo-symbols
```

---

## 🚀 Usage

Wrap your app once in `<DynamicNotifications>`, inside `GestureHandlerRootView` and `SafeAreaProvider`. The overlay renders above everything else in the tree.

```tsx
// app/_layout.tsx
import { DynamicNotifications } from "@/components";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <DynamicNotifications>
          <Stack screenOptions={{ headerShown: false }} />
        </DynamicNotifications>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
```

Then trigger a notification from any screen:

```tsx
import { useDynamicNotifications } from "@/hooks";
import { Button } from "react-native";

export function Example() {
  const { trigger } = useDynamicNotifications();

  return (
    <Button
      title="Notify"
      onPress={() =>
        trigger({
          title: "New Follower!",
          message: "Sasuke followed you",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          symbol: {
            ios: "person.fill.badge.plus",
            android: "person_add",
            web: "person_add",
          },
          accent: "#2F9BFF",
        })
      }
    />
  );
}
```

## Preview

https://github.com/user-attachments/assets/9c38cf28-fa30-40cc-ac24-518a85f9a055

### Controlling duration

`duration` is in milliseconds. Set it on the root for every notification, or on a single notification to override the root value. `null` keeps the notification visible until it's swiped away, tapped, or dismissed in code.

```tsx
<DynamicNotifications duration={2500}>{/* … */}</DynamicNotifications>;

trigger({ title: "Uploading…", duration: null });

// later
const { dismiss } = useDynamicNotifications();
dismiss();
```

### Handling taps and dismissals

```tsx
trigger({
  title: "Kakashi",
  message: "Training at 6. Do not be late.",
  onPress: () => router.push("/messages/kakashi"),
});

<DynamicNotifications onDismiss={(n) => console.log("dismissed", n.id)}>
  {/* … */}
</DynamicNotifications>;
```

### Custom content

Pass `render` to replace the default body. Your content fills the card and still gets the morph, the blur reveal and the dismiss gesture.

```tsx
trigger({
  title: "Now Playing",
  duration: null,
  render: () => (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
      }}
    >
      <Text style={{ fontWeight: "700" }}>Midnight City: M83</Text>
    </View>
  ),
});
```

The default layout is also exported as `<DynamicNotifications.Body notification={n} />`, so you can wrap or extend it.

---

## 🧱 Component Anatomy

```tsx
<DynamicNotifications>
  {/* your app */}
  <DynamicNotifications.Overlay>
    {" "}
    {/* rendered automatically */}
    <DynamicNotifications.Gooey /> {/* Skia island, neck and droplet */}
    <DynamicNotifications.Content>
      {" "}
      {/* the card, gesture and blur */}
      <DynamicNotifications.Body />
    </DynamicNotifications.Content>
  </DynamicNotifications.Overlay>
</DynamicNotifications>
```

---

## 🧩 API

### `<DynamicNotifications>` (root)

| Prop           | Type                   | Default                  | Description                                              |
| -------------- | ---------------------- | ------------------------ | -------------------------------------------------------- |
| `duration`     | `number \| null`       | `3600`                   | Auto-dismiss delay in ms. `null` disables auto-dismiss.  |
| `onDismiss`    | `(n) => void`          | none                     | Called after a notification finishes its exit animation. |
| `strength`     | `number`               | `0.62`                   | Goo strength from 0 to 1. Maps to the blur radius.       |
| `blur`         | `number`               | derived from `strength`  | Explicit goo blur radius. Overrides `strength`.          |
| `gain`         | `number`               | `22`                     | Alpha gain of the goo colour matrix.                     |
| `threshold`    | `number`               | `0.43`                   | Alpha cutoff of the goo colour matrix.                   |
| `islandWidth`  | `number`               | `126`                    | Width of the island pill.                                |
| `islandHeight` | `number`               | `37.33`                  | Height of the island pill.                               |
| `islandTop`    | `number`               | derived from safe area   | Top offset of the island.                                |
| `islandColor`  | `string`               | `#000000`                | Island and droplet start colour.                         |
| `cardWidth`    | `number`               | `min(width - 32, 396)`   | Width of the notification card.                          |
| `cardHeight`   | `number`               | `74`                     | Height of the notification card.                         |
| `cardRadius`   | `number`               | `cardHeight / 2`         | Corner radius of the card.                               |
| `cardColor`    | `string`               | `#FFFFFF`                | Card and droplet end colour.                             |
| `shadowColor`  | `string`               | `rgba(16, 19, 28, 0.20)` | Card drop-shadow colour.                                 |
| `accent`       | `string`               | `#2F9BFF`                | Default title and symbol tint.                           |
| `gap`          | `number`               | `34`                     | Space between the island and the card.                   |
| `style`        | `StyleProp<ViewStyle>` | none                     | Style for the root container.                            |
| `children`     | `ReactNode`            | none                     | Your app.                                                |

### Notification object (`IDynamicNotification`)

| Field      | Type                      | Description                                               |
| ---------- | ------------------------- | --------------------------------------------------------- |
| `title`    | `string`                  | Required. Bold first line, tinted with `accent`.          |
| `message`  | `string`                  | Secondary line.                                           |
| `avatar`   | `string`                  | Image URI shown on the left.                              |
| `symbol`   | `SymbolViewProps["name"]` | SF Symbol / Material icon shown on the right.             |
| `accent`   | `string`                  | Per-notification tint. Overrides the root `accent`.       |
| `duration` | `number \| null`          | Per-notification lifetime. Overrides the root `duration`. |
| `onPress`  | `() => void`              | Runs on tap, then the notification dismisses.             |
| `render`   | `(n) => ReactNode`        | Replaces the default body with your own content.          |
| `id`       | `string`                  | Your identifier, passed back through `onDismiss`.         |

### `<DynamicNotifications.Gooey>`

Each prop overrides the matching value from the root: `blur`, `gain`, `threshold`, `islandColor`, `cardColor`, `shadowColor`.

### `<DynamicNotifications.Content>` · `<DynamicNotifications.Overlay>`

| Prop    | Type                   | Description                       |
| ------- | ---------------------- | --------------------------------- |
| `style` | `StyleProp<ViewStyle>` | Extra style merged onto the view. |

### `useDynamicNotifications()`

| Field                                           | Type                                | Description                                                          |
| ----------------------------------------------- | ----------------------------------- | -------------------------------------------------------------------- |
| `trigger(n)`                                    | `(n: IDynamicNotification) => void` | Show a notification, replacing the current one if one is visible.    |
| `dismiss()`                                     | `() => void`                        | Close the current notification and clear anything queued.            |
| `isVisible`                                     | `boolean`                           | Whether a notification is currently showing.                         |
| `notification`                                  | `IDynamicNotification \| null`      | The active notification.                                             |
| `layout`                                        | `INotificationLayout`               | Resolved island and card geometry.                                   |
| `drop` · `expand` · `reveal` · `tint` · `dragY` | `SharedValue<number>`               | Read-only animation drivers, for UI that reacts to the notification. |

---

## 🧱 Stack

[Expo SDK 57](https://expo.dev/changelog) · [React Native 0.86](https://reactnative.dev/) · [Skia](https://shopify.github.io/react-native-skia/) · [Reanimated 4](https://docs.swmansion.com/react-native-reanimated/) · [Worklets](https://docs.swmansion.com/react-native-worklets/) · [Gesture Handler 2](https://docs.swmansion.com/react-native-gesture-handler/) · [expo-blur](https://docs.expo.dev/versions/latest/sdk/blur-view/) · [expo-symbols](https://docs.expo.dev/versions/latest/sdk/symbols/) · [Safe Area Context](https://github.com/th3rdwave/react-native-safe-area-context) · [Expo Router](https://docs.expo.dev/router/introduction/)

---
