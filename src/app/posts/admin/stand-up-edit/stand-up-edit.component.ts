import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../../service/notification.service";
import {PostStandUpService} from "../../../service/post-standup.service";
import {PostStandUp} from "../../../models/PostStandUp";

@Component({
  selector: 'app-stand-up-edit',
  templateUrl: './stand-up-edit.component.html',
  styleUrls: ['./stand-up-edit.component.css']
})
export class StandUpEditComponent implements OnInit {

  public postEditForm: FormGroup | any;

  constructor(private dialogRef: MatDialogRef<StandUpEditComponent>,
              private fb: FormBuilder,
              private notificationService: NotificationService,
              // @ts-ignore
              @Inject(MAT_DIALOG_DATA) public data,
              private postService: PostStandUpService) {
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
      titleInfo : [
        this.data.post.titleInfo,
        Validators.compose([Validators.required])
      ],
      info: [
        this.data.post.info,
        Validators.compose([Validators.required])
      ],
      shortInfo : [
        this.data.post.shortInfo,
        Validators.compose(null)
      ],
      genre : [
        this.data.post.genre,
        Validators.compose(null)
      ],
      executor : [
        this.data.post.executor,
        Validators.compose(null)
      ],
      address : [
        this.data.post.address,
        Validators.compose(null)
      ],
      metro : [
        this.data.post.metro,
        Validators.compose(null)
      ],
      image : [
        this.data.post.image,
        Validators.compose([Validators.required])
      ],
      mainImage : [
        this.data.post.mainImage,
        Validators.compose([Validators.required])
      ]
    });
  }

  submit(): void {
    this.postService.updatePost(this.updatePost())
      .subscribe(() => {
        this.notificationService.showSnackBar('Пост успешно обновлен');
        this.dialogRef.close();
      });
  }

  delete(): void {
    this.postService.deletePost(this.data.post.id)
      .subscribe(() => {
        this.notificationService.showSnackBar('Пост успешно удален');
        this.dialogRef.close();
      });
  }

  private updatePost(): PostStandUp {
    this.data.post.title = this.postEditForm.value.title;
    this.data.post.titleInfo = this.postEditForm.value.titleInfo;
    this.data.post.info = this.postEditForm.value.info;
    this.data.post.shortInfo = this.postEditForm.value.shortInfo;
    this.data.post.genre = this.postEditForm.value.genre;
    this.data.post.executor = this.postEditForm.value.executor;
    this.data.post.address = this.postEditForm.value.address;
    this.data.post.metro = this.postEditForm.value.metro;
    this.data.post.image = this.postEditForm.value.image;
    this.data.post.mainImage = this.postEditForm.value.mainImage;
    return this.data.post;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
