import { EXIT_ANTICIPATION_VELOCITY } from "@/constants/notification.consts";
import type { WithSpringConfig } from "react-native-reanimated";

const DROP_SPRING: WithSpringConfig = {
  duration: 1150,
  dampingRatio: 0.82,
};

const EXPAND_SPRING: WithSpringConfig = {
  duration: 1000,
  dampingRatio: 0.8,
};

const REVEAL_SPRING: WithSpringConfig = {
  duration: 700,
  dampingRatio: 1,
};

const TINT_SPRING: WithSpringConfig = {
  duration: 700,
  dampingRatio: 1,
};

const COLLAPSE_SPRING: WithSpringConfig = {
  duration: 660,
  dampingRatio: 0.92,
  velocity: EXIT_ANTICIPATION_VELOCITY,
};

const RETURN_SPRING: WithSpringConfig = {
  duration: 1150,
  dampingRatio: 0.9,
};

const FADE_SPRING: WithSpringConfig = {
  duration: 360,
  dampingRatio: 1,
};

const DRAG_SPRING: WithSpringConfig = {
  duration: 560,
  dampingRatio: 0.7,
};

export {
  COLLAPSE_SPRING,
  DRAG_SPRING,
  DROP_SPRING,
  EXPAND_SPRING,
  FADE_SPRING,
  RETURN_SPRING,
  REVEAL_SPRING,
  TINT_SPRING,
};
