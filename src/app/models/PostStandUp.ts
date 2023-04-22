import {CommentStandUp} from "./CommentStandUp";

export interface PostStandUp {
  id?: number;
  title: string;
  info: string;
  shortInfo: string;
  genre: string;
  executor: string;
  image?: string;
  likes?: number;
  usersLiked?: string[];
  comments?: CommentStandUp [];
  username?: string;
}