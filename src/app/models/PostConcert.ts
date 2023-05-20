import {CommentFilm} from "./CommentFilm";

export interface PostConcert {
  id: number;
  title: string;
  info: string;
  shortInfo: string;
  genre?: string;
  image?: string;
  likes?: number;
  address?: string;
  executor?: string;
  usersLiked: string[];
  comments?: CommentFilm [];
}
