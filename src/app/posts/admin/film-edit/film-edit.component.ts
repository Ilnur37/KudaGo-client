import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../../service/notification.service";
import {PostFilmService} from "../../../service/post-film.service";
import {PostFilm} from "../../../models/PostFilm";

@Component({
  selector: 'app-film-main-edit',
  templateUrl: './film-edit.component.html',
  styleUrls: ['./film-edit.component.css']
})
export class FilmEditComponent implements OnInit {

  public postEditForm: FormGroup | any;

  constructor(private dialogRef: MatDialogRef<FilmEditComponent>,
              private fb: FormBuilder,
              private notificationService: NotificationService,
              // @ts-ignore
              @Inject(MAT_DIALOG_DATA) public data,
              private postService: PostFilmService) {
  }

  ngOnInit(): void {
    this.postEditForm = this.createPostForm();
  }

  createPostForm(): FormGroup {
    return this.fb.group({
      title : [
        this.data.post.title,
        Validators.compose([Validators.required])
      ],
      info: [
        this.data.post.info,
        Validators.compose([Validators.required])
      ],
      shortInfo : [
        this.data.post.shortInfo,
        Validators.compose([Validators.required])
      ],
      genre : [
        this.data.post.genre,
        Validators.compose([Validators.required])
      ],
      cinema : [
        this.data.post.cinema,
        Validators.compose([Validators.required])
      ],
      image : [
        this.data.post.image,
        Validators.compose([Validators.required])
      ],
      backgroundImg : [
        this.data.post.backgroundImg,
        Validators.compose([Validators.required])
      ]
    });
  }

  submit(): void {
    this.postService.updatePost(this.updatePost())
      .subscribe(() => {
        this.notificationService.showSnackBar('Post updated successfully');
        this.dialogRef.close();
      });
  }

  delete(): void {
    this.postService.deletePost(this.data.post.id)
      .subscribe(() => {
        this.notificationService.showSnackBar('Post deleted successfully');
        this.dialogRef.close();
      });
  }

  private updatePost(): PostFilm {
    this.data.post.title = this.postEditForm.value.title;
    this.data.post.info = this.postEditForm.value.info;
    this.data.post.shortInfo = this.postEditForm.value.shortInfo;
    this.data.post.genre = this.postEditForm.value.genre;
    this.data.post.cinema = this.postEditForm.value.cinema;
    this.data.post.image = this.postEditForm.value.image;
    this.data.post.backgroundImg = this.postEditForm.value.backgroundImg;
    return this.data.post;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
