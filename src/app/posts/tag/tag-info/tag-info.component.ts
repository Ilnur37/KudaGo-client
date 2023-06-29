import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/User";
import {ActivatedRoute, Params} from "@angular/router";
import {UserService} from "../../../service/user.service";
import {NotificationService} from "../../../service/notification.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {PostTag} from "../../../models/PostTag";
import {PostTagService} from "../../../service/post-tag.service";
import {CommentTagService} from "../../../service/comment-tag.service";
import {TagEditComponent} from "../../admin/tag-edit/tag-edit.component";

@Component({
  selector: 'app-tag-info',
  templateUrl: './tag-info.component.html',
  styleUrls: ['./tag-info.component.css']
})
export class TagInfoComponent implements OnInit {

  isPostLoaded = false;
  post: PostTag | any;
  isUserDataLoaded = false;
  user: User | any;
  isAdmin = false;
  genres: string[] | any;

  constructor(private route: ActivatedRoute,
              private postService: PostTagService,
              private userService: UserService,
              private commentService: CommentTagService,
              private notificationService: NotificationService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      console.log(param);
      this.postService.getFullInfo(+param['id'])
        .subscribe(data => {
          console.log(data);
          this.post = data;
          this.getCommentsToPosts(this.post);
          this.isPostLoaded = true;
          this.genres = data.genre.split("-");
        })
    })

    this.userService.getCurrentUser()
      .subscribe(data => {
        console.log(data);
        this.user = data;
        this.isUserDataLoaded = true;
        if (data.role == "ROLE_ADMIN")
          this.isAdmin = true;
        console.log(this.isAdmin);
      })
  }

  getCommentsToPosts(post: PostTag): void {
    this.commentService.getCommentsToPost(post.id)
      .subscribe(data => {
        post.comments = data
      });
  }

  likePost(): void {
    console.log(this.post);

    if (!this.post.usersLiked.includes(this.user.username)) {
      this.postService.likePost(this.post.id, this.user.username)
        .subscribe(() => {
          this.post.usersLiked.push(this.user.username);
          this.notificationService.showSnackBar('Liked!');
        });
    } else {
      this.postService.likePost(this.post.id, this.user.username)
        .subscribe(() => {
          const index = this.post.usersLiked.indexOf(this.user.username, 0);
          if (index > -1) {
            this.post.usersLiked.splice(index, 1);
          }
        });
    }
  }

  postComment(event: Event): void {
    const target = event.target as HTMLInputElement;
    console.log(target.value);
    let message = target.value;

    this.commentService.addToCommentToPost(this.post.id, message)
      .subscribe(data => {
        console.log(data);
        this.post.comments.push(data);
      });
  }

  openEditDialog(): void {
    const dialogPostEditConfig = new MatDialogConfig();
    dialogPostEditConfig.width = '550px';
    dialogPostEditConfig.data = {
      post: this.post
    };
    this.dialog.open(TagEditComponent, dialogPostEditConfig);
  }
}
