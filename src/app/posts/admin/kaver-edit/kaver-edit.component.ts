import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../../service/notification.service";
import {PostKaverService} from "../../../service/post-kaver.service";
import {PostKaver} from "../../../models/PostKaver";

@Component({
  selector: 'app-kaver-edit',
  templateUrl: './kaver-edit.component.html',
  styleUrls: ['./kaver-edit.component.css']
})
export class KaverEditComponent  implements OnInit {

  public postEditForm: FormGroup | any;

  constructor(private dialogRef: MatDialogRef<KaverEditComponent>,
              private fb: FormBuilder,
              private notificationService: NotificationService,
              // @ts-ignore
              @Inject(MAT_DIALOG_DATA) public data,
              private postService: PostKaverService) {
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
      genre : [
        this.data.post.genre,
        Validators.compose(null)
      ],
      address : [
        this.data.post.address,
        Validators.compose(null)
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

  private updatePost(): PostKaver {
    this.data.post.title = this.postEditForm.value.title;
    this.data.post.info = this.postEditForm.value.info;
    this.data.post.genre = this.postEditForm.value.genre;
    this.data.post.address = this.postEditForm.value.address;
    this.data.post.mainImage = this.postEditForm.value.mainImage;
    return this.data.post;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
