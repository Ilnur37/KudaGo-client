import { Component } from '@angular/core';
import {User} from "../../../models/User";
import {ActivatedRoute, Params} from "@angular/router";
import {UserService} from "../../../service/user.service";
import {NotificationService} from "../../../service/notification.service";
import {PostTag} from "../../../models/PostTag";
import {PostTagService} from "../../../service/post-tag.service";

@Component({
  selector: 'app-tag-main',
  templateUrl: './tag-main.component.html',
  styleUrls: ['./tag-main.component.css']
})
export class TagMainComponent {

  isPostsLoaded = false;
  posts: PostTag[] | any;
  isUserDataLoaded = false;
  user: User | any;
  selected : string | any;
  titleSearch : string = '';

  constructor(private route: ActivatedRoute,
              private postService: PostTagService,
              private userService: UserService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      console.log(param['genre']);
      this.postService.getAllPosts(param['genre'], param['sorted'])
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
    let post: PostTag;

    this.posts.forEach((p : PostTag) => {
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
