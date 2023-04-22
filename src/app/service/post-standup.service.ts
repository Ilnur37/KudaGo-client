import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PostStandUp} from "../models/PostStandUp";
import {Observable} from "rxjs";

const POST_API = 'http://localhost:8080/api/postStandUp/';

@Injectable({
  providedIn: 'root'
})
export class PostStandUpService {
  constructor(private http: HttpClient) { }

  createPost(post: PostStandUp): Observable<any> {
    return this.http.post(POST_API + 'create', post);
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
