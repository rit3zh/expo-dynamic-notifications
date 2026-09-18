import {
  Button,
  ControlGroup,
  Divider,
  Host,
  Menu,
  RNHostView,
  Section,
} from "@expo/ui/swift-ui";
import { Image } from "expo-image";
import { memo, useState, type ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { CommentIcon } from "./comment-icon";
import { Glyph } from "./glyph";
import { SoftPhoto } from "./soft-photo";
import { FEED, FEED_SIZES } from "./theme";
import type { IPost, PostMenuAction } from "./types";

interface IPostCard {
  post: IPost;
  width: number;
  onLike: (post: IPost) => void;
  onRepost: (post: IPost) => void;
  onComment: (post: IPost) => void;
  onShare: (post: IPost) => void;
  onMore: (post: IPost, action: PostMenuAction) => void;
}

interface IAction {
  children: ReactNode;
  label: string;
  count?: number;
  onPress: () => void;
}

const ICON = 21;

const HEART_SPRING = { duration: 420, dampingRatio: 0.45 };

const Action = ({ children, label, count, onPress }: IAction) => (
  <Pressable
    onPress={onPress}
    hitSlop={8}
    accessibilityRole="button"
    accessibilityLabel={label}
    style={({ pressed }) => [styles.action, pressed && styles.pressed]}
  >
    {children}
    {count !== undefined ? <Text style={styles.count}>{count}</Text> : null}
  </Pressable>
);

const PostCard: React.FC<IPostCard> & React.FunctionComponent<IPostCard> =
  memo<IPostCard>(
    ({
      post,
      width,
      onLike,
      onRepost,
      onComment,
      onShare,
      onMore,
    }: IPostCard) => {
      const [liked, setLiked] = useState(post.liked ?? false);
      const [reposted, setReposted] = useState(false);

      const likes = post.likes - (post.liked ? 1 : 0) + (liked ? 1 : 0);
      const reposts = post.reposts + (reposted ? 1 : 0);

      const heart = useSharedValue(1);
      const heartStyle = useAnimatedStyle(() => ({
        transform: [{ scale: heart.value }],
      }));

      const toggleLike = () => {
        const next = !liked;
        setLiked(next);

        if (next) {
          heart.value = withSequence(
            withTiming(1.3, { duration: 110 }),
            withSpring(1, HEART_SPRING),
          );
          onLike(post);
        }
      };

      const toggleRepost = () => {
        const next = !reposted;
        setReposted(next);

        if (next) {
          onRepost(post);
        }
      };

      return (
        <View style={styles.post}>
          <View style={styles.header}>
            <Image
              source={{ uri: post.avatar }}
              style={styles.avatar}
              contentFit="cover"
              transition={220}
              cachePolicy="memory-disk"
            />

            <View style={styles.identity}>
              <Text style={styles.name} numberOfLines={1}>
                {post.author}
              </Text>
              <Text style={styles.context} numberOfLines={1}>
                {post.context}
              </Text>
            </View>

            <Host style={styles.more}>
              <Menu
                label={
                  <RNHostView>
                    <Glyph
                      name={{
                        ios: "ellipsis",
                        android: "more_horiz",
                        web: "more_horiz",
                      }}
                      size={18}
                      color={FEED.muted}
                    />
                  </RNHostView>
                }
              >
                <ControlGroup>
                  <Button
                    systemImage="bookmark"
                    label="Save"
                    onPress={() => onMore(post, "save")}
                  />
                  <Button
                    systemImage="link"
                    label="Copy link"
                    onPress={() => onMore(post, "copy-link")}
                  />
                  <Button
                    systemImage="star"
                    label="Favorite"
                    onPress={() => onMore(post, "favorite")}
                  />
                </ControlGroup>
                <Section>
                  <Button
                    systemImage="bell"
                    label="Turn on post notifications"
                    onPress={() => onMore(post, "notify")}
                  />
                  <Button
                    systemImage="eye.slash"
                    label="Not interested"
                    onPress={() => onMore(post, "not-interested")}
                  />
                </Section>
                <Section>
                  <Button
                    systemImage="speaker.slash"
                    label={`Mute ${post.author}`}
                    onPress={() => onMore(post, "mute")}
                  />
                  <Button
                    systemImage="person.badge.minus"
                    label={`Unfollow ${post.author}`}
                    onPress={() => onMore(post, "unfollow")}
                  />
                </Section>
                <Divider />
                <Button
                  role="destructive"
                  systemImage="exclamationmark.bubble"
                  label="Report"
                  onPress={() => onMore(post, "report")}
                />
              </Menu>
            </Host>
          </View>

          <SoftPhoto
            uri={post.image}
            width={width}
            glow={8}
            height={Math.round(width * FEED_SIZES.photoRatio)}
            radius={FEED_SIZES.photoRadius}
          />

          <View style={styles.actions}>
            <Action
              label={liked ? "Unlike" : "Like"}
              count={likes}
              onPress={toggleLike}
            >
              <Animated.View style={heartStyle}>
                <Glyph
                  name={
                    liked
                      ? {
                          ios: "heart.fill",
                          android: "favorite",
                          web: "favorite",
                        }
                      : {
                          ios: "heart",
                          android: "favorite_border",
                          web: "favorite_border",
                        }
                  }
                  size={ICON}
                  color={liked ? FEED.like : FEED.iconSoft}
                  weight="regular"
                />
              </Animated.View>
            </Action>

            <Action
              label={reposted ? "Undo repost" : "Repost"}
              count={reposts}
              onPress={toggleRepost}
            >
              <Glyph
                name={{
                  ios: "arrow.triangle.2.circlepath",
                  android: "cached",
                  web: "cached",
                }}
                size={ICON - 1}
                color={reposted ? FEED.ink : FEED.iconSoft}
                weight={reposted ? "semibold" : "regular"}
              />
            </Action>

            <Action
              label="Comments"
              count={post.comments}
              onPress={() => onComment(post)}
            >
              <CommentIcon size={ICON} color={FEED.iconSoft} />
            </Action>

            <View style={styles.spacer} />

            <Action label="Share" onPress={() => onShare(post)}>
              <Glyph
                name={{
                  ios: "arrowshape.turn.up.right",
                  android: "forward",
                  web: "forward",
                }}
                size={ICON - 1}
                color={FEED.iconSoft}
                weight="regular"
              />
            </Action>
          </View>
        </View>
      );
    },
  );

const styles = StyleSheet.create({
  post: {
    gap: 14,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: FEED_SIZES.postAvatar,
    height: FEED_SIZES.postAvatar,
    borderRadius: FEED_SIZES.postAvatar / 2,
    backgroundColor: FEED.placeholder,
  },
  identity: {
    flex: 1,
    gap: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: "600",
    letterSpacing: -0.4,
    color: FEED.ink,
  },
  context: {
    fontSize: 14.5,
    fontWeight: "400",
    letterSpacing: -0.2,
    color: FEED.muted,
  },
  more: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    right: 10,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 22,
    paddingHorizontal: 4,
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  count: {
    fontSize: 15,
    fontWeight: "400",
    letterSpacing: -0.2,
    fontVariant: ["tabular-nums"],
    color: FEED.iconSoft,
  },
  spacer: {
    flex: 1,
  },
  pressed: {
    opacity: 0.55,
  },
});

export { PostCard };
export type { IPostCard };
