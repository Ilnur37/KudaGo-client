import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PostTop} from "../models/PostTop";

const POST_API = 'http://localhost:8080/api/post-top/';

@Injectable({
  providedIn: 'root'
})
export class PostTopService {
  constructor(private http: HttpClient) { }

  createPost(post: PostTop): Observable<any> {
    return this.http.post(POST_API + 'create', post);
  }

  getAllPosts(): Observable<any> {
    // @ts-ignore
    return this.http.get(POST_API + 'all');
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
