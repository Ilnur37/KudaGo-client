import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/User";
import {ActivatedRoute, Params} from "@angular/router";
import {UserService} from "../../../service/user.service";
import {NotificationService} from "../../../service/notification.service";
import {PostConcert} from "../../../models/PostConcert";
import {PostConcertService} from "../../../service/post-concert.service";
import {PostFilm} from "../../../models/PostFilm";

@Component({
  selector: 'app-concert-main',
  templateUrl: './concert-main.component.html',
  styleUrls: ['./concert-main.component.css']
})
export class ConcertMainComponent implements OnInit {

  isPostsLoaded = false;
  posts: PostConcert[] | any;
  isUserDataLoaded = false;
  user: User | any;
  selectedByLikes : string = 'default';
  selectedByGenre : string = 'default';
  titleSearch : string = '';

  constructor(private route: ActivatedRoute,
              private postService: PostConcertService,
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
    let post: PostConcert;

    this.posts.forEach((p : PostConcert) => {
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
