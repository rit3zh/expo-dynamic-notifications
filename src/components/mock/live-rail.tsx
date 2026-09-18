import { memo } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { LiveCard } from "./live-card";
import { SIZES } from "./theme";
import type { ILive } from "./types";

interface ILiveRail {
  rooms: ILive[];
  onOpen: (room: ILive) => void;
  onFollow: (room: ILive) => void;
}

const LiveRail: React.FC<ILiveRail> & React.FunctionComponent<ILiveRail> =
  memo<ILiveRail>(({ rooms, onOpen, onFollow }: ILiveRail) => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={SIZES.liveWidth + 12}
        snapToAlignment="start"
        contentContainerStyle={styles.rail}
      >
        {rooms.map((room) => (
          <LiveCard
            key={room.id}
            room={room}
            onOpen={() => onOpen(room)}
            onFollow={() => onFollow(room)}
          />
        ))}
      </ScrollView>
    );
  });

const styles = StyleSheet.create({
  rail: {
    paddingHorizontal: SIZES.gutter,
    paddingBottom: 4,
    gap: 12,
  },
});

export { LiveRail };
export type { ILiveRail };
