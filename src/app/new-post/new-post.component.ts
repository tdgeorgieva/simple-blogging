import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, ValidationErrors, AbstractControl } from '@angular/forms';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

export interface Tags {
  name: string;
}
@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  postForm: FormGroup;
  title: string;
  date: string;
  author: string;
  text: string;
  tags: string;
  status: boolean;
  imageUrl: string;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tagWords: Tags[] = [];


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.tagWords.push({ name: value.trim() });
    }

    if (input) {
      input.value = '';
    }
  }

  remove(tag: Tags): void {
    const index = this.tagWords.indexOf(tag);

    if (index >= 0) {
      this.tagWords.splice(index, 1);
    }
  }




  get postFormControl() {
    return this.postForm.controls;
  }

  constructor() { }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.postForm.value);
  }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      date: new FormControl(this.date, Validators.required),
      title: new FormControl(this.title, [
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(2)
      ]),
      author: new FormControl(this.author, [
        Validators.required,
        Validators.maxLength(20)
      ]),
      text: new FormControl (this.text, Validators.required),
      tags: new FormControl(this.tags, Validators.required),
      imageUrl: new FormControl(this.imageUrl,
        [
          Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
        ])
    });
  }

}
