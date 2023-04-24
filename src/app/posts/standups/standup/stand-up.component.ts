import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/User";
import {UserService} from "../../../service/user.service";
import {CommentStandUpService} from "../../../service/comment-stand-up.service";
import {NotificationService} from "../../../service/notification.service";
import {PostStandUp} from "../../../models/PostStandUp";
import {PostStandUpService} from "../../../service/post-standup.service";

@Component({
  selector: 'app-standup',
  templateUrl: './stand-up.component.html',
  styleUrls: ['./stand-up.component.css']
})
export class StandUpComponent implements OnInit{

  isPostsLoaded = false;
  posts: PostStandUp[] | any;
  isUserDataLoaded = false;
  user: User | any;

  constructor(private postService: PostStandUpService,
              private userService: UserService,
              private commentService: CommentStandUpService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.postService.getAllPosts()
      .subscribe(data => {
        console.log(data);
        this.posts = data;
        this.getCommentsToPosts(this.posts);
        this.isPostsLoaded = true;
      })

    this.userService.getCurrentUser()
      .subscribe(data => {
        console.log(data);
        this.user = data;
        this.isUserDataLoaded = true;
      })
  }

  getCommentsToPosts(posts: PostStandUp[]): void {
    posts.forEach(p => {
      this.commentService.getCommentsToPost(p.id)
        .subscribe(data => {
          p.comments = data
        })
    });
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

  postComment(event: Event, postId: number, postIndex: number): void {
    const target = event.target as HTMLInputElement;
    console.log(target.value);
    let message = target.value;
    const post = this.posts[postIndex];

    console.log(post);
    this.commentService.addToCommentToPost(postId, message)
      .subscribe(data => {
        console.log(data);
        post.comments.push(data);
      });
  }
}
