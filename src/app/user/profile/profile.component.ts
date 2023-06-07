import {Component, OnInit} from '@angular/core';
import {User} from '../../models/User';
import {TokenStorageService} from '../../service/token-storage.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {NotificationService} from '../../service/notification.service';
import {UserService} from '../../service/user.service';
import {EditUserComponent} from '../edit-user/edit-user.component';
import {AvatarService} from "../../service/avatar.service";
import {FilmMainComponent} from "../../posts/films/film-main/film-main.component";
import {ConcertMainComponent} from "../../posts/concerts/concert-main/concert-main.component";
import {StandUpMainComponent} from "../../posts/standups/standup-main/stand-up-main.component";
import {PostFilm} from "../../models/PostFilm";
import {PostFilmService} from "../../service/post-film.service";
import {PostStandUpService} from "../../service/post-standup.service";
import {PostConcertService} from "../../service/post-concert.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  // @ts-ignore
  //imports: FilmMainComponent
})
export class ProfileComponent implements OnInit {

  isUserDataLoaded = false;
  user: User | any;
  selectedFile: File | any;
  avatar: File | any;
  previewImgURL: any;
  favourite : any[] | any;

  constructor(private tokenService: TokenStorageService,
              public postFilmService: PostFilmService,
              public postStandUpService: PostStandUpService,
              public postConcertService: PostConcertService,
              private dialog: MatDialog,
              private notificationService: NotificationService,
              private avatarService: AvatarService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getCurrentUser()
      .subscribe(data => {
        this.user = data;
        this.isUserDataLoaded = true;
      });

    this.avatarService.getProfileImage()
      .subscribe(data => {
        this.avatar = data.imageBytes;
      });

    this.userService.getFavouritePosts()
      .subscribe(data => {
        console.log(data);
        this.favourite = data;
      });
  }

  onFileSelected(event: Event): void {
    // @ts-ignore
    this.selectedFile = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      this.previewImgURL = reader.result;
    };
  }

  openEditDialog(): void {
    const dialogUserEditConfig = new MatDialogConfig();
    dialogUserEditConfig.width = '400px';
    dialogUserEditConfig.data = {
      user: this.user
    };
    this.dialog.open(EditUserComponent, dialogUserEditConfig);
  }

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }

  onUpload(): void {
    if (this.selectedFile != null) {
      this.avatarService.uploadAvatarToUser(this.selectedFile)
        .subscribe(() => {
          this.notificationService.showSnackBar('Profile Image updated successfully');
        });
    }
  }

  likePost(postId: number): void {
    let post: any;

    this.favourite.forEach((p : any) => {
      if (p.id == postId) post = p;
    })
    // @ts-ignore
    console.log(post);

    if (post.referenceInfo == '/film/') {
      // @ts-ignore
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
    } else {
      if (post.referenceInfo == '/standUp/info/') {
        // @ts-ignore
        if (!post.usersLiked.includes(this.user.username)) {
          this.postStandUpService.likePost(postId, this.user.username)
            .subscribe(() => {
              post.usersLiked.push(this.user.username);
              this.notificationService.showSnackBar('Liked!');
            });
        } else {
          this.postStandUpService.likePost(postId, this.user.username)
            .subscribe(() => {
              const index = post.usersLiked.indexOf(this.user.username, 0);
              if (index > -1) {
                post.usersLiked.splice(index, 1);
              }
            });
        }
      } else {
        if (post.referenceInfo == '/concert/') {
          // @ts-ignore
          if (!post.usersLiked.includes(this.user.username)) {
            this.postConcertService.likePost(postId, this.user.username)
              .subscribe(() => {
                post.usersLiked.push(this.user.username);
                this.notificationService.showSnackBar('Liked!');
              });
          } else {
            this.postConcertService.likePost(postId, this.user.username)
              .subscribe(() => {
                const index = post.usersLiked.indexOf(this.user.username, 0);
                if (index > -1) {
                  post.usersLiked.splice(index, 1);
                }
              });
          }
        }
      }
    }
  }
}
