import type { IDynamicNotification } from "@/interfaces/dynamic-notification.interface";
import { FEED } from "./theme";
import type { IPost, IStory } from "./types";

const follower = <T extends IStory>(story: T): IDynamicNotification => ({
  id: `follow-${story.id}`,
  title: "New Follower!",
  duration: 2000,
  message: `${story.name} followed you`,
  avatar: story.avatar,
  symbol: {
    ios: "person.fill.badge.plus",
    android: "person_add",
    web: "person_add",
  },
});

const liked = <T extends IPost>(post: T): IDynamicNotification => ({
  id: `like-${post.id}`,
  title: "Liked",
  message: `You and ${post.likes} others love this`,
  avatar: post.avatar,
  symbol: { ios: "heart.fill", android: "favorite", web: "favorite" },
  accent: FEED.like,
});

const reposted = <T extends IPost>(post: T): IDynamicNotification => ({
  id: `repost-${post.id}`,
  title: "Reposted",
  message: `${post.author}'s post is on your profile`,
  avatar: post.avatar,
  symbol: {
    ios: "arrow.triangle.2.circlepath",
    android: "cached",
    web: "cached",
  },
});

const commented = <T extends IPost>(post: T): IDynamicNotification => ({
  id: `comment-${post.id}`,
  title: "Join the thread",
  message: `${post.comments} comments on this post`,
  avatar: post.avatar,
  symbol: {
    ios: "ellipsis.bubble.fill",
    android: "chat_bubble",
    web: "chat_bubble",
  },
});

const shared = <T extends IPost>(post: T): IDynamicNotification => ({
  id: `share-${post.id}`,
  title: "Link copied",
  message: `${post.author}'s post is on your clipboard`,
  avatar: post.avatar,
  symbol: { ios: "link", android: "link", web: "link" },
});

const saved = <T extends IPost>(post: T): IDynamicNotification => ({
  id: `save-${post.id}`,
  title: "Saved",
  message: "Added to your collection",
  avatar: post.avatar,
  symbol: { ios: "bookmark.fill", android: "bookmark", web: "bookmark" },
});

const favorited = <T extends IPost>(post: T): IDynamicNotification => ({
  id: `favorite-${post.id}`,
  title: "Favorited",
  message: `You'll see more from ${post.author}`,
  avatar: post.avatar,
  symbol: { ios: "star.fill", android: "star", web: "star" },
});

const postAlerts = <T extends IPost>(post: T): IDynamicNotification => ({
  id: `alerts-${post.id}`,
  title: "Notifications on",
  message: `We'll ping you when ${post.author} posts`,
  avatar: post.avatar,
  symbol: { ios: "bell.fill", android: "notifications", web: "notifications" },
});

const hidden = <T extends IPost>(post: T): IDynamicNotification => ({
  id: `hide-${post.id}`,
  title: "Got it",
  message: "You'll see fewer posts like this",
  avatar: post.avatar,
  symbol: {
    ios: "eye.slash.fill",
    android: "visibility_off",
    web: "visibility_off",
  },
  accent: FEED.iconSoft,
});

const muted = <T extends IPost>(post: T): IDynamicNotification => ({
  id: `mute-${post.id}`,
  title: "Muted",
  message: `${post.author} won't show up in your feed`,
  avatar: post.avatar,
  symbol: {
    ios: "speaker.slash.fill",
    android: "volume_off",
    web: "volume_off",
  },
  accent: FEED.iconSoft,
});

const unfollowed = <T extends IPost>(post: T): IDynamicNotification => ({
  id: `unfollow-${post.id}`,
  title: "Unfollowed",
  message: `You're no longer following ${post.author}`,
  avatar: post.avatar,
  symbol: {
    ios: "person.fill.badge.minus",
    android: "person_remove",
    web: "person_remove",
  },
  accent: FEED.iconSoft,
});

const reported = <T extends IPost>(post: T): IDynamicNotification => ({
  id: `report-${post.id}`,
  title: "Thanks for letting us know",
  duration: 2500,
  message: "We'll review this post shortly",
  avatar: post.avatar,
  symbol: {
    ios: "exclamationmark.bubble.fill",
    android: "report",
    web: "report",
  },
  accent: FEED.like,
});

const caughtUp = <T extends string>(avatar: T): IDynamicNotification => ({
  id: "caught-up",
  title: "All caught up",
  message: "New posts will land right here",
  avatar,
  symbol: {
    ios: "checkmark.circle.fill",
    android: "check_circle",
    web: "check_circle",
  },
});

const filtered = <T extends string>(avatar: T): IDynamicNotification => ({
  id: "filtered",
  title: "Close friends",
  message: "Showing the people you talk to most",
  avatar,
  symbol: {
    ios: "line.3.horizontal.decrease.circle.fill",
    android: "filter_list",
    web: "filter_list",
  },
});

const searching = <T extends string>(avatar: T): IDynamicNotification => ({
  id: "search",
  title: "Search",
  message: "Try “beach” or “Colosseum”",
  avatar,
  symbol: {
    ios: "text.magnifyingglass",
    android: "manage_search",
    web: "manage_search",
  },
});

const storyAdded = <T extends string>(avatar: T): IDynamicNotification => ({
  id: "story-added",
  title: "Story posted",
  message: "Visible to your close friends for 24h",
  avatar,
  symbol: {
    ios: "checkmark.seal.fill",
    android: "check_circle",
    web: "check_circle",
  },
});

const draftSaved = <T extends string>(avatar: T): IDynamicNotification => ({
  id: "draft",
  title: "Draft saved",
  message: "Pick it back up whenever you like",
  avatar,
  symbol: { ios: "bolt.fill", android: "bolt", web: "bolt" },
  accent: FEED.iconSoft,
});

export {
  caughtUp,
  commented,
  draftSaved,
  favorited,
  filtered,
  follower,
  hidden,
  liked,
  muted,
  postAlerts,
  reported,
  reposted,
  saved,
  searching,
  shared,
  storyAdded,
  unfollowed,
};
