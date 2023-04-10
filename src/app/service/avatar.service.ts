import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const IMAGE_API = 'http://localhost:8080/api/avatar/';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor(private http: HttpClient) { }

  uploadAvatarToUser(file: File): Observable<any> {
    const uploadData = new FormData();
    uploadData.append('file', file);
    return this.http.post(IMAGE_API + 'upload', uploadData);
  }

  getProfileImage(): Observable<any> {
    return this.http.get(IMAGE_API + 'profileImage');
  }
}
