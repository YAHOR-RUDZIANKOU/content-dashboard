export type BaseResource = {
  userId: number;
  id: number;
  title: string;
};

export type Post = BaseResource & {
  body: string;
};

export type Todo = BaseResource & {
  completed: boolean;
};

export type Album = BaseResource;

export type Photos = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};
