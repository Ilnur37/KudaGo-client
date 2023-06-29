import {CommentTag} from "./CommentTag";

export interface PostTag {
  id?: number;
  title: string;
  info: string;
  shortInfo: string;
  genre?: string;
  address?: string;
  mainImage?: string;
  likes?: number;
  usersLiked: string[];
  comments?: CommentTag [];
  referenceInfo: string;
}
