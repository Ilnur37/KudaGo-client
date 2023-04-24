import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../../service/notification.service";
import {PostFilmService} from "../../../service/post-film.service";

@Component({
  selector: 'app-film-main-edit',
  templateUrl: './film-edit.component.html',
  styleUrls: ['./film-edit.component.css']
})
export class FilmEditComponent implements OnInit {

  public filmEditForm: FormGroup | any;

  constructor(private dialogRef: MatDialogRef<FilmEditComponent>,
              private fb: FormBuilder,
              private notificationService: NotificationService,
              // @ts-ignore
              @Inject(MAT_DIALOG_DATA) public data,
              private postFilmService: PostFilmService) {
  }

  ngOnInit(): void {
    this.filmEditForm = this.createFilmForm();
  }

  createFilmForm() {
  }
}
