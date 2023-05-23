import {CommentFilm} from "./CommentFilm";

export interface PostTop {
  id?: number;
  title: string;
  titleInfo: string;
  info: string;
  shortInfo: string;
  rating?: string;
  genre?: string;
  executor?: string;
  address?: string;
  metro?: string;
  image?: string;
  mainImage?: string;
  likes?: number;
  usersLiked: string[];
  comments?: CommentFilm [];
}
