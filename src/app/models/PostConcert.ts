import {CommentFilm} from "./CommentFilm";

export interface PostConcert {
  id?: number;
  title: string;
  titleInfo: string;
  info: string;
  shortInfo: string;
  genre?: string;
  executor?: string;
  address?: string;
  metro?: string;
  image?: string;
  mainImage?: string;
  likes?: number;
  usersLiked: string[];
  comments?: CommentFilm [];
  referenceInfo: string;
}
