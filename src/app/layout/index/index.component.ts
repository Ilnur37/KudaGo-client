import {Component, OnInit} from '@angular/core';
import {PostFilm} from "../../models/PostFilm";
import {User} from "../../models/User";
import {PostFilmService} from "../../service/post-film.service";
import {UserService} from "../../service/user.service";
import {CommentFilmService} from "../../service/comment-film.service";
import {NotificationService} from "../../service/notification.service";
import {ImageFilmService} from "../../service/image-film.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  isPostsLoaded = false;
  postFilms: PostFilm[] | any;
  isUserDataLoaded = false;
  user: User | any;

  constructor(private postFilmService: PostFilmService,
              private userService: UserService,
              private commentFilmService: CommentFilmService,
              private notificationService: NotificationService,
              private imageFilmService: ImageFilmService
  ) { }

  ngOnInit(): void {
    this.postFilmService.getAllPosts()
      .subscribe(data => {
        console.log(data);
        this.postFilms = data;
        this.getCommentsToPosts(this.postFilms);
        this.getImagesToPosts(this.postFilms);
        this.isPostsLoaded = true;
      })

    this.userService.getCurrentUser()
      .subscribe(data => {
        console.log(data);
        this.user = data;
        this.isUserDataLoaded = true;
      })
  }

  getImagesToPosts(posts: PostFilm[]): void {
    posts.forEach(p => {
      this.imageFilmService.getImageToPost(p.id)
        .subscribe((data: { imageBytes: File | undefined; }) => {
          p.image = data.imageBytes;
        })
    });
  }

  getCommentsToPosts(posts: PostFilm[]): void {
    posts.forEach(p => {
      this.commentFilmService.getCommentsToPost(p.id)
        .subscribe(data => {
          p.comments = data
        })
    });
  }

  likePost(postId: number, postIndex: number): void {
    const post = this.postFilms[postIndex];
    console.log(post);

    if (!post.usersLiked.includes(this.user.username)) {
      this.postFilmService.likePost(postId, this.user.username)
        .subscribe(() => {
          post.usersLiked.push(this.user.username);
          this.notificationService.showSnackBar('Liked!');
        });
    } else {
      this.postFilmService.likePost(postId, this.user.username)
        .subscribe(() => {
          const index = post.usersLiked.indexOf(this.user.username, 0);
          if (index > -1) {
            post.usersLiked.splice(index, 1);
          }
        });
    }
  }

  //postComment(message: string, postId: number, postIndex: number): void {
  postComment(event: Event, postId: number, postIndex: number): void {
    const target = event.target as HTMLInputElement;
    console.log(target.value);
    let message = target.value;

    const post = this.postFilms[postIndex];

    console.log(post);
    this.commentFilmService.addToCommentToPost(postId, message)
      .subscribe(data => {
        console.log(data);
        post.comments.push(data);
      });
  }

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }
}
