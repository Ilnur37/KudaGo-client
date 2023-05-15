import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/User";
import {PostStandUp} from "../../../models/PostStandUp";
import {ActivatedRoute, Params} from "@angular/router";
import {UserService} from "../../../service/user.service";
import {NotificationService} from "../../../service/notification.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {PostStandUpService} from "../../../service/post-standup.service";
import {CommentStandUpService} from "../../../service/comment-stand-up.service";
import {PostFilm} from "../../../models/PostFilm";
import {FilmEditComponent} from "../../admin/film-edit/film-edit.component";
import {StandUpEditComponent} from "../../admin/stand-up-edit/stand-up-edit.component";

@Component({
  selector: 'app-standup-info',
  templateUrl: './stand-up-info.component.html',
  styleUrls: ['./stand-up-info.component.css']
})
export class StandUpInfoComponent implements OnInit {

  isPostLoaded = false;
  post: PostStandUp | any;
  isUserDataLoaded = false;
  user: User | any;
  isAdmin = false;

  constructor(private route: ActivatedRoute,
              private postService: PostStandUpService,
              private userService: UserService,
              private commentService: CommentStandUpService,
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

  getCommentsToPosts(post: PostFilm): void {
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

    console.log(this.post);
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
    this.dialog.open(StandUpEditComponent, dialogPostEditConfig);
  }

}
