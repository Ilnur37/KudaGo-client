import {CommentFilm} from './CommentFilm';

export interface PostFilm {
  id?: number;
  title: string;
  info: string;
  shortInfo: string;
  genre: string;
  cinema: string;
  image?: string;
  likes?: number;
  usersLiked?: string[];
  comments?: CommentFilm [];
  username?: string;
}

