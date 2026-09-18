import type { IPost, IStory } from "./types";

const portrait = (gender: "men" | "women", index: number) =>
  `https://randomuser.me/api/portraits/${gender}/${index}.jpg`;

const photo = (id: string, width: number, height: number) =>
  `https://images.unsplash.com/photo-${id}?w=${width}&h=${height}&fit=crop&auto=format&q=80`;

const cover = (id: string) => photo(id, 300, 400);
const shot = (id: string) => photo(id, 1000, 830);

const STORIES: IStory[] = [
  {
    id: "noah",
    name: "Noah",
    avatar:
      "https://i.pinimg.com/736x/5f/93/2e/5f932e19b03f4c5e628208f603fed9dc.jpg",
    cover:
      "https://i.pinimg.com/736x/91/88/49/9188491bed11c0fbc2c142c3a263fd7d.jpg",
  },
  {
    id: "jose",
    name: "Jose",
    avatar:
      "https://i.pinimg.com/1200x/47/0e/cd/470ecd0e32c6d4ce5328faa3e8db10e7.jpg",
    cover:
      "https://i.pinimg.com/1200x/6f/68/48/6f6848e5c089f7722fb39604deef165d.jpg",
  },
  {
    id: "ari",
    name: "Ari",
    avatar:
      "https://i.pinimg.com/1200x/fa/7a/2c/fa7a2ca3b5a67be62016c874f1f7632c.jpg",
    cover:
      "https://i.pinimg.com/1200x/85/a6/ec/85a6ecb98250e3b9d7a51a341ff30ae4.jpg",
  },
  {
    id: "mika",
    name: "Mika",
    avatar:
      "https://i.pinimg.com/1200x/90/34/bb/9034bbf600a3050af39acfda86a2143a.jpg",
    cover:
      "https://i.pinimg.com/736x/58/58/eb/5858eb05b4227df584c4e76f5778c030.jpg",
  },
  {
    id: "dan",
    name: "Dan",
    avatar:
      "https://i.pinimg.com/736x/d7/f2/40/d7f240dc3cc1e3e3606bfdae5eb9c5b1.jpg",
    cover:
      "https://i.pinimg.com/1200x/5e/e5/21/5ee521ee9a5e3e9eb85d3a9506c1fd03.jpg",
  },
  {
    id: "ilse",
    name: "Ilse",
    avatar: portrait("women", 71),
    cover: cover("1507525428034-b723cf961d3e"),
  },
];

const POSTS: IPost[] = [
  {
    id: "beach",
    author: "Sebastian Rojas",
    avatar:
      "https://i.pinimg.com/736x/d4/35/03/d43503384a8a25a7af5e090ece62cf0f.jpg",
    context: "Looking for a good beach to surf.",
    image:
      "https://i.pinimg.com/originals/06/42/75/06427511f311dddbf7fea8f7142d7e10.jpg",
    likes: 43,
    reposts: 1,
    comments: 5,
    liked: true,
  },
  {
    id: "colosseum",
    author: "Felix Schneider",
    avatar:
      "https://i.pinimg.com/1200x/63/54/b2/6354b2abb98f28d07f03aadc7de4b4eb.jpg",
    context: "is at The Colosseum with 2 others",
    image:
      "https://i.pinimg.com/736x/23/d3/d3/23d3d39b65756af0db37c3bd681a4fef.jpg",
    likes: 128,
    reposts: 12,
    comments: 24,
  },
  {
    id: "braies",
    author: "Leah Márquez",
    avatar: portrait("women", 65),
    context: "is at Lago di Braies",
    image: shot("1476514525535-07fb3b4ae5f1"),
    likes: 86,
    reposts: 4,
    comments: 9,
  },
  {
    id: "nevada",
    author: "Teo Vance",
    avatar: portrait("men", 60),
    context: "Road tripping with 3 others",
    image: shot("1500530855697-b586d89ba3ee"),
    likes: 210,
    reposts: 18,
    comments: 31,
  },
];

export { POSTS, STORIES };
