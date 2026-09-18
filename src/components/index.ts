import { Content } from "./dynamic-notifications/content";
import { Gooey } from "./dynamic-notifications/gooey";
import { Overlay } from "./dynamic-notifications/overlay";
import { Root } from "./dynamic-notifications/root";
import { NotificationBody } from "./ui/notification-body";

const DynamicNotifications = Object.assign(Root, {
  Overlay,
  Gooey,
  Content,
  Body: NotificationBody,
});

export { DynamicNotifications };
