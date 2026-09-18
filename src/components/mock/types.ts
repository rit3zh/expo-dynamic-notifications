import type { SymbolViewProps } from "expo-symbols";

type GlyphName = SymbolViewProps["name"];

interface IStory {
  id: string;
  name: string;
  avatar: string;
  cover: string;
}

interface IReactor {
  id: string;
  avatar: string;
}

interface ILive {
  id: string;
  host: string;
  avatar: string;
  followers: string;
  title: string;
  image: string;
  elapsed: string;
  viewers: string;
  reactors: IReactor[];
  extra: string;
  following?: boolean;
}

interface IPost {
  id: string;
  author: string;
  avatar: string;
  context: string;
  image: string;
  likes: number;
  reposts: number;
  comments: number;
  liked?: boolean;
}

type PostMenuAction =
  | "save"
  | "copy-link"
  | "favorite"
  | "notify"
  | "not-interested"
  | "mute"
  | "unfollow"
  | "report";

export type { GlyphName, ILive, IPost, IReactor, IStory, PostMenuAction };
