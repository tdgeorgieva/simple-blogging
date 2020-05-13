import { ActivatedRoute } from '@angular/router';
import { Post } from './../post.model';
import { BlogService } from './../blog.service';
import { Component, OnInit, Injectable } from '@angular/core';
import { FormControl, Validators, FormGroup, ValidationErrors, AbstractControl } from '@angular/forms';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})

export class NewPostComponent implements OnInit {

  constructor(private blogService: BlogService, private route: ActivatedRoute ) { }

  title: string;
  date: string;
  author: string;
  text: string;
  tags: string;
  status: boolean;
  imageUrl: string;
  checked = true;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tagWords: string[] = [];

  postForm = new FormGroup({
    date: new FormControl(this.date, Validators.required),
    title: new FormControl(this.title, [
      Validators.required,
      Validators.maxLength(30),
      Validators.minLength(2)
    ]),
    author: new FormControl(this.author, [
      Validators.required,
      Validators.maxLength(20)
    ]),
    text: new FormControl(this.text, Validators.required),
    tags: new FormControl(this.tags),
    imageUrl: new FormControl(this.imageUrl, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')),
    status: new FormControl(this.status),
  });


  get postFormControl() {
    return this.postForm.controls;
  }

  get posts() {
    return this.blogService.findAll();
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.postForm.value);
    const id = +this.route.snapshot.paramMap.get('id');
    const post = new Post(
      new Date(this.postForm.controls.date.value),
      this.postForm.controls.title.value,
      this.postForm.controls.author.value,
      this.postForm.controls.text.value,
      this.postForm.controls.status.value,
      this.tagWords,
      this.postForm.controls.imageUrl.value

    );
    console.log(post);

    if (id) {
      post.id = id;
      this.blogService.update(post);

    } else {
      this.blogService.create(post);
    }
    console.log(post.id);
  }


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.tagWords.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  remove(tag: string): void {
    const index = this.tagWords.indexOf(tag);

    if (index >= 0) {
      this.tagWords.splice(index, 1);
    }
  }


  ngOnInit(): void {
    // localStorage.removeItem('posts');

    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
        const post = this.blogService.findById(id);
        this.postForm.patchValue({
          date: post.date,
          title: post.title,
          author: post.author,
          text: post.text,
          tags: post.tags,
          imageURL: post.imageURL,
          status: post.status
        });

    }
  }

}
