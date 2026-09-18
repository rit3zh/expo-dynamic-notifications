const THEME = {
  bg: "#EEF3FC",
  surface: "#FFFFFF",
  ink: "#0E1726",
  muted: "#7C8AA3",
  soft: "#DEE7F5",
  accent: "#2F7DFF",
  accentDeep: "#1857D6",
  accentLift: "#7FB4FF",
  accentSoft: "#E4EEFF",
  like: "#FF4D6D",
  live: "#2F7DFF",
  shadow: "rgba(18, 42, 90, 0.16)",
  glass: "rgba(255, 255, 255, 0.55)",
  glassEdge: "rgba(255, 255, 255, 0.72)",
  glassDark: "rgba(12, 28, 58, 0.28)",
  glassDarkEdge: "rgba(255, 255, 255, 0.34)",
} as const;

const STAR_STOPS = [
  { offset: 0, color: "#FFD3B0" },
  { offset: 0.16, color: "#FFA9CE" },
  { offset: 0.32, color: "#C6A8FF" },
  { offset: 0.46, color: "#7FB4FF" },
  { offset: 0.62, color: "#2F7DFF" },
  { offset: 0.84, color: "#1550CF" },
  { offset: 1, color: "#2ECBE8" },
] as const;

const STAR_GLOW = "#3C89FF" as const;

const STAR_SHEEN = "#FFFFFF" as const;

const SIZES = {
  gutter: 16,
  cardRadius: 28,
  mediaRadius: 22,
  storySize: 56,
  barHeight: 46,
  control: 42,
  cutoutGap: 9,
  headerFade: 300,
  liveWidth: 228,
  liveHeight: 268,
  liveRadius: 26,
} as const;

const FEED = {
  bg: "#ECECF0",
  bgChannels: "236, 236, 240",
  surface: "#FFFFFF",
  ink: "#111114",
  icon: "#3A3A40",
  iconSoft: "#6E6E76",
  muted: "#9A9AA1",
  like: "#F2473F",
  placeholder: "#DEDEE3",
  glassTint: "rgba(255, 255, 255, 0.35)",
  frost: "rgba(255, 255, 255, 0.72)",
  frostEdge: "rgba(255, 255, 255, 0.9)",
  glow: "rgba(255, 255, 255, 0.55)",
  shadow: "rgba(20, 20, 32, 0.10)",
} as const;

const FEED_SIZES = {
  gutter: 16,
  control: 48,
  dock: 52,
  dockAvatar: 62,
  mark: 44,
  storyWidth: 74,
  storyHeight: 98,
  storyAvatar: 30,
  postAvatar: 42,
  photoRadius: 50,
  photoRatio: 0.83,
} as const;

export { FEED, FEED_SIZES, SIZES, STAR_GLOW, STAR_SHEEN, STAR_STOPS, THEME };
