import type { IDynamicNotification } from "@/interfaces/dynamic-notification.interface";

const notifications: IDynamicNotification[] = [
  {
    id: "follower",
    title: "New Follower!",
    message: "Sasuke\u{1F343} followed you",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    symbol: { ios: "person.fill.badge.plus", android: "person_add", web: "person_add" },
    accent: "#2F9BFF",
  },
  {
    id: "like",
    title: "Liked your post",
    message: "Hinata and 24 others",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    symbol: { ios: "heart.fill", android: "favorite", web: "favorite" },
    accent: "#FF3B5C",
  },
  {
    id: "message",
    title: "Kakashi",
    message: "Training at 6. Do not be late.",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    symbol: { ios: "bubble.left.fill", android: "chat_bubble", web: "chat_bubble" },
    accent: "#34C759",
  },
  {
    id: "verified",
    title: "You are verified",
    message: "Your account is now confirmed",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    symbol: { ios: "checkmark.seal.fill", android: "check_circle", web: "check_circle" },
    accent: "#7A5CFF",
  },
];

export { notifications };
