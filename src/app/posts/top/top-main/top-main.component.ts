import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/User";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../service/user.service";
import {NotificationService} from "../../../service/notification.service";
import {PostTop} from "../../../models/PostTop";
import {PostTopService} from "../../../service/post-top.service";

@Component({
  selector: 'app-top-main',
  templateUrl: './top-main.component.html',
  styleUrls: ['./top-main.component.css']
})
export class TopMainComponent implements OnInit{

  isPostsLoaded = false;
  posts: PostTop[] | any;
  isUserDataLoaded = false;
  user: User | any;

  constructor(private route: ActivatedRoute,
              private postService: PostTopService,
              private userService: UserService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.postService.getAllPosts()
      .subscribe(data => {
        console.log(data);
        this.posts = data;
        this.isPostsLoaded = true;
      })

    this.userService.getCurrentUser()
      .subscribe(data => {
        console.log(data);
        this.user = data;
        this.isUserDataLoaded = true;
      })
  }

  likePost(postId: number, postIndex: number): void {
    const post = this.posts[postIndex];
    console.log(post);

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
