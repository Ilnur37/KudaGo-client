import {Component, OnInit} from '@angular/core';
import {PostFilm} from "../../../models/PostFilm";
import {User} from "../../../models/User";
import {PostFilmService} from "../../../service/post-film.service";
import {UserService} from "../../../service/user.service";
import {NotificationService} from "../../../service/notification.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-film-main-edit',
  templateUrl: './film-main.component.html',
  styleUrls: ['./film-main.component.css']
})
export class FilmMainComponent implements OnInit {

  isPostsLoaded = false;
  posts: PostFilm[] | any;
  isUserDataLoaded = false;
  user: User | any;
  selectedByLikes : string = 'default';
  selectedByGenre : string = 'default';
  titleSearch : string = '';

  constructor(private route: ActivatedRoute,
              private postService: PostFilmService,
              private userService: UserService,
              private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.postService.getAllPosts(param['sortLike'], param['sortGenre'])
        .subscribe(data => {
          console.log('data', data);
          this.posts = data;
          this.isPostsLoaded = true;
      })
    })

    this.userService.getCurrentUser()
      .subscribe(data => {
        console.log(data);
        this.user = data;
        this.isUserDataLoaded = true;
      })
  }

  likePost(postId: number): void {
    let post: PostFilm;

    this.posts.forEach((p : PostFilm) => {
      if (p.id == postId) post = p;
    })
    // @ts-ignore
    console.log(post);

    // @ts-ignore
    if (!post.usersLiked.includes(this.user.username)) {
      this.postService.likePost(postId, this.user.username)
        .subscribe(() => {
          post.usersLiked.push(this.user.username);
          this.notificationService.showSnackBar('Liked!');
        });
    } else {
      this.postService.likePost(postId, this.user.username)
        .subscribe(() => {
          const index = post.usersLiked.indexOf(this.user.username, 0);
          if (index > -1) {
            post.usersLiked.splice(index, 1);
          }
        });
    }
  }
}
