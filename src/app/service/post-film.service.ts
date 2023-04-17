import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PostFilm} from "../models/PostFilm";

const POST_API = 'http://localhost:8080/api/postFilm/';


@Injectable({
  providedIn: 'root'
})
export class PostFilmService {

  constructor(private http: HttpClient) {
  }

  createPost(postFilm: PostFilm): Observable<any> {
    return this.http.post(POST_API + 'create', postFilm);
  }

  getAllPosts(): Observable<any> {
    return this.http.get(POST_API + 'all');
  }

  deletePost(id: number): Observable<any> {
    return this.http.post(POST_API + id + '/delete', null);
  }

  likePost(id: number, username: string): Observable<any> {
    return this.http.post(POST_API + id + '/' + username + '/like', null);
  }
}
