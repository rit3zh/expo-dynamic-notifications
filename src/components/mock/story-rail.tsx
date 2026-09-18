import { Image } from "expo-image";
import { memo } from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import { SoftPhoto } from "./soft-photo";
import { FEED, FEED_SIZES } from "./theme";
import type { IStory } from "./types";

interface IStoryRail {
  stories: IStory[];
  onOpen: (story: IStory) => void;
}

const WIDTH = FEED_SIZES.storyWidth;
const HEIGHT = FEED_SIZES.storyHeight;
const AVATAR = FEED_SIZES.storyAvatar;

const StoryRail: React.FC<IStoryRail> & React.FunctionComponent<IStoryRail> =
  memo<IStoryRail>(({ stories, onOpen }: IStoryRail) => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.rail}
      >
        {stories.map((story) => (
          <Pressable
            key={story.id}
            onPress={() => onOpen(story)}
            accessibilityRole="button"
            accessibilityLabel={`${story.name}'s story`}
            style={({ pressed }) => [pressed && styles.pressed]}
          >
            <SoftPhoto
              uri={story.cover}
              width={WIDTH}
              height={HEIGHT}
              radius={WIDTH / 2}
              blur={8}
              glow={5}
            >
              <Image
                source={{ uri: story.avatar }}
                style={styles.avatar}
                contentFit="cover"
                transition={220}
                cachePolicy="memory-disk"
              />
            </SoftPhoto>
          </Pressable>
        ))}
      </ScrollView>
    );
  });

const styles = StyleSheet.create({
  rail: {
    paddingHorizontal: FEED_SIZES.gutter,
    gap: 12,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.96 }],
  },
  avatar: {
    position: "absolute",
    bottom: 8,
    left: (WIDTH - AVATAR) / 2,
    width: AVATAR,
    height: AVATAR,
    borderRadius: AVATAR / 2,
    borderWidth: 0.5,
    borderColor: FEED.surface,
    backgroundColor: FEED.placeholder,
  },
});

export { StoryRail };
export type { IStoryRail };
