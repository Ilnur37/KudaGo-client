import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PostFilm} from "../models/PostFilm";

const POST_API = 'http://localhost:8080/api/post-film/';

@Injectable({
  providedIn: 'root'
})
export class PostFilmService {

  constructor(private http: HttpClient) {
  }

  createPost(postFilm: PostFilm): Observable<any> {
    return this.http.post(POST_API + 'create', postFilm);
  }

  getAllPosts(sortLike: string, sortGenre: string): Observable<any> {
    // @ts-ignore
    return this.http.get(POST_API + 'all/' + sortLike + '/' + sortGenre, sortLike, sortGenre);
  }

  getFullInfo(id: number): Observable<any> {
    // @ts-ignore
    return this.http.get(POST_API + id, id);
  }

  updatePost(post: any): Observable<any> {
    return this.http.post(POST_API + 'update', post);
  }

  deletePost(id: number): Observable<any> {
    return this.http.post(POST_API + id + '/delete', null);
  }

    likePost(id: number, username: number): Observable<any> {
    return this.http.post(POST_API + id + '/' + username + '/like', null);
  }
}
