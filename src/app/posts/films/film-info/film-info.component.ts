import {Component, OnInit} from '@angular/core';
import {PostFilm} from "../../../models/PostFilm";
import {User} from "../../../models/User";
import {PostFilmService} from "../../../service/post-film.service";
import {UserService} from "../../../service/user.service";
import {CommentFilmService} from "../../../service/comment-film.service";
import {NotificationService} from "../../../service/notification.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-film-info',
  templateUrl: './film-info.component.html',
  styleUrls: ['./film-info.component.css']
})
export class FilmInfoComponent implements OnInit {

  isPostLoaded = false;
  post: PostFilm | any;
  isUserDataLoaded = false;
  user: User | any;

  constructor(private route: ActivatedRoute,
              private postService: PostFilmService,
              private userService: UserService,
              private commentService: CommentFilmService,
              private notificationService: NotificationService) {
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





  /*openEditDialog(): void {
    const dialogUserEditConfig = new MatDialogConfig();
    dialogUserEditConfig.width = '400px';
    dialogUserEditConfig.data = {
      post: this.posts
    };
    this.dialog.open(EditUserComponent, dialogUserEditConfig);
  }*/
}
