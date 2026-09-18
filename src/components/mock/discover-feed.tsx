import { useDynamicNotifications } from "@/hooks/use-dynamic-notifications";
import { BlurTargetView } from "expo-blur";
import { useCallback, useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppHeader } from "./app-header";
import { POSTS, STORIES } from "./data";
import { EdgeFade } from "./edge-fade";
import { FloatingDock } from "./floating-dock";
import {
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
} from "./notify";
import { PostCard } from "./post-card";
import { StoryRail } from "./story-rail";
import { FEED, FEED_SIZES } from "./theme";
import type { IPost, IStory, PostMenuAction } from "./types";

const ME =
  "https://pbs.twimg.com/profile_images/2064564663019569152/5k4DbNsp_400x400.jpg";

const MENU_NOTIFICATIONS = {
  save: saved,
  "copy-link": shared,
  favorite: favorited,
  notify: postAlerts,
  "not-interested": hidden,
  mute: muted,
  unfollow: unfollowed,
  report: reported,
} satisfies Record<PostMenuAction, (post: IPost) => unknown>;

const HEADER_OFFSET = 6;
const HEADER_GAP = 30;
const TOP_FADE_TAIL = 18;
const BOTTOM_FADE_TAIL = 44;

const DiscoverFeed: React.FC & React.FunctionComponent = () => {
  const { trigger } = useDynamicNotifications();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const blurTarget = useRef<View>(null);
  const scroll = useRef<ScrollView>(null);
  const cardWidth = width - FEED_SIZES.gutter * 2;
  const headerTop = insets.top + HEADER_OFFSET;
  const headerBottom = headerTop + FEED_SIZES.control;
  const topFade = headerBottom + TOP_FADE_TAIL;

  const dockBottom = Math.max(insets.bottom, 16) + 8;
  const dockTop = dockBottom + FEED_SIZES.dockAvatar;
  const bottomFade = dockTop + BOTTOM_FADE_TAIL;

  const onMenu = useCallback(() => trigger(filtered(ME)), [trigger]);
  const onMark = useCallback(() => trigger(caughtUp(ME)), [trigger]);
  const onBell = useCallback(() => trigger(follower(STORIES[0])), [trigger]);

  const onDiscover = useCallback(
    () => scroll.current?.scrollTo({ y: 0, animated: true }),
    [],
  );
  const onCreate = useCallback(() => trigger(storyAdded(ME)), [trigger]);
  const onSearch = useCallback(() => trigger(searching(ME)), [trigger]);
  const onProfile = useCallback(() => trigger(draftSaved(ME)), [trigger]);

  const onOpenStory = useCallback(
    (story: IStory) => trigger(follower(story)),
    [trigger],
  );
  const onLike = useCallback((post: IPost) => trigger(liked(post)), [trigger]);
  const onRepost = useCallback(
    (post: IPost) => trigger(reposted(post)),
    [trigger],
  );
  const onComment = useCallback(
    (post: IPost) => trigger(commented(post)),
    [trigger],
  );
  const onShare = useCallback(
    (post: IPost) => trigger(shared(post)),
    [trigger],
  );
  const onMore = useCallback(
    (post: IPost, action: PostMenuAction) =>
      trigger(MENU_NOTIFICATIONS[action](post)),
    [trigger],
  );

  return (
    <View style={styles.screen}>
      <BlurTargetView ref={blurTarget} style={styles.target}>
        <ScrollView
          ref={scroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.content,
            {
              paddingTop: headerBottom + HEADER_GAP,
              paddingBottom: bottomFade + 24,
            },
          ]}
        >
          <StoryRail stories={STORIES} onOpen={onOpenStory} />

          <View style={styles.feed}>
            {POSTS.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                width={cardWidth}
                onLike={onLike}
                onRepost={onRepost}
                onComment={onComment}
                onShare={onShare}
                onMore={onMore}
              />
            ))}
          </View>
        </ScrollView>
      </BlurTargetView>
      <EdgeFade edge="top" height={topFade} hold={insets.top / topFade} />
      <EdgeFade
        edge="bottom"
        height={bottomFade}
        hold={dockBottom / bottomFade}
      />
      <AppHeader
        top={headerTop}
        blurTarget={blurTarget}
        onMenu={onMenu}
        onMark={onMark}
        onBell={onBell}
      />

      <FloatingDock
        bottom={dockBottom}
        avatar={ME}
        blurTarget={blurTarget}
        onDiscover={onDiscover}
        onCreate={onCreate}
        onSearch={onSearch}
        onProfile={onProfile}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: FEED.bg,
  },
  target: {
    flex: 1,
  },
  content: {
    gap: 28,
  },
  feed: {
    paddingHorizontal: FEED_SIZES.gutter,
    gap: 30,
  },
});

export { DiscoverFeed };
