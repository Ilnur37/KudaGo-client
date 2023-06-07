import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PostConcert} from "../models/PostConcert";

const POST_API = 'http://localhost:8080/api/post-concert/';

@Injectable({
  providedIn: 'root'
})
export class PostConcertService {

  constructor(private http: HttpClient) {
  }

  createPost(post: PostConcert): Observable<any> {
    return this.http.post(POST_API + 'create', post);
  }

  getAllPosts(sortLike: string, sortGenre: string): Observable<any> {
    // @ts-ignore
    return this.http.get(POST_API + 'all/' + sortLike + '/' + sortGenre, sortLike, sortGenre);
  }

  getFullInfo(id: number): Observable<any> {
    // @ts-ignore
    return this.http.get(POST_API + 'info/' + id, id);
  }

  updatePost(post: any): Observable<any> {
    return this.http.post(POST_API + 'update', post);
  }

  deletePost(id: number): Observable<any> {
    return this.http.post(POST_API + id + '/delete', null);
  }

  likePost(id: number, username: string): Observable<any> {
    return this.http.post(POST_API + id + '/' + username + '/like', null);
  }
}
