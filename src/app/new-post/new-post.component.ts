import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, ValidationErrors, AbstractControl } from '@angular/forms';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

export interface Tags {
  name: string;
}
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
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
  image: string;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tagWords: Tags[] = [];

  tiles: Tile[] = [
    {text: 'One', cols: 2, rows: 1, color: 'lightblue'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tagWords.push({name: value.trim()});
    }

    // Reset the input value
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
      title: new FormControl (this.title, Validators.required),
      author: new FormControl (this.author, Validators.required),
      text: new FormControl (this.text, Validators.required ),
      tags: new FormControl (this.tags, Validators.required ),
      image: new FormControl (this.image, Validators.required )
    });
  }

}
