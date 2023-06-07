import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/User";
import {UserService} from "../../../service/user.service";
import {NotificationService} from "../../../service/notification.service";
import {PostStandUp} from "../../../models/PostStandUp";
import {ActivatedRoute, Params} from "@angular/router";
import {PostStandUpService} from "../../../service/post-standup.service";
import {PostFilm} from "../../../models/PostFilm";

@Component({
  selector: 'app-standup-main',
  templateUrl: './stand-up-main.component.html',
  styleUrls: ['./stand-up-main.component.css']
})
export class StandUpMainComponent implements OnInit{

  isPostsLoaded = false;
  posts: PostStandUp[] | any;
  isUserDataLoaded = false;
  user: User | any;
  selected : string | any;
  titleSearch : string = '';

  constructor(private route: ActivatedRoute,
              private postService: PostStandUpService,
              private userService: UserService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.postService.getAllPosts(param['sorted'])
        .subscribe(data => {
          console.log(data);
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
    let post: PostStandUp;

    this.posts.forEach((p : PostStandUp) => {
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
