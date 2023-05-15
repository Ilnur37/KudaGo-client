import { Pipe, PipeTransform } from '@angular/core';
import {PostFilm} from "../models/PostFilm";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(posts: any[], titleSearch: string = ''): any[] {
    if (!titleSearch.trim()) {
      return posts;
    }

    return posts.filter(post => {
      return post.title.toLowerCase().includes(titleSearch.toLowerCase())
    })
  }
}
