import { LinearGradient } from "expo-linear-gradient";
import { memo, useMemo } from "react";
import { StyleSheet } from "react-native";
import { FEED } from "./theme";

interface IEdgeFade {
  edge: "top" | "bottom";
  height: number;
  hold?: number;
}

type Stops<T> = readonly [T, T, ...T[]];

const STEPS = 12;

const toStops = <T,>(list: T[]): Stops<T> => {
  const [first, second, ...rest] = list;
  return [first, second, ...rest] as const;
};

const smooth = (t: number) => t * t * (3 - 2 * t);

const EdgeFade: React.FC<IEdgeFade> & React.FunctionComponent<IEdgeFade> =
  memo<IEdgeFade>(({ edge, height, hold = 0 }: IEdgeFade) => {
    const { colors, locations } = useMemo(() => {
      const alphas: number[] = hold > 0 ? [1] : [];
      const offsets: number[] = hold > 0 ? [0] : [];

      for (let step = 0; step <= STEPS; step++) {
        const t = step / STEPS;
        alphas.push(1 - smooth(t));
        offsets.push(hold + (1 - hold) * t);
      }

      return {
        colors: toStops(
          alphas.map((alpha) => `rgba(${FEED.bgChannels}, ${alpha.toFixed(3)})`),
        ),
        locations: toStops(offsets),
      };
    }, [hold]);

    const top = edge === "top";

    return (
      <LinearGradient
        pointerEvents="none"
        colors={colors}
        locations={locations}
        start={{ x: 0, y: top ? 0 : 1 }}
        end={{ x: 0, y: top ? 1 : 0 }}
        style={[styles.fade, top ? styles.top : styles.bottom, { height }]}
      />
    );
  });

const styles = StyleSheet.create({
  fade: {
    position: "absolute",
    left: 0,
    right: 0,
  },
  top: {
    top: 0,
  },
  bottom: {
    bottom: 0,
  },
});

export { EdgeFade };
export type { IEdgeFade };
