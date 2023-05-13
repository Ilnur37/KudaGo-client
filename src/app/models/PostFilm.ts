import {CommentFilm} from './CommentFilm';

export interface PostFilm {
  id: number;
  title: string;
  info: string;
  shortInfo: string;
  genre?: string;
  cinema?: string;
  image?: string;
  backgroundImg?: string
  likes?: number;
  rating?: string;
  usersLiked: string[];
  comments?: CommentFilm [];
}

