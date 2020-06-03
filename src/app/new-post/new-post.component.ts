import { ActivatedRoute, Router } from '@angular/router';
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
  post: Post;
  id: string;

  constructor(private blogService: BlogService, private route: ActivatedRoute, private router: Router) { }

  title: string;
  date: string;
  author: string;
  text: string;
  tags: string;
  status = true;
  imageUrl: string;

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
      Validators.maxLength(50),
      Validators.minLength(2)
    ]),
    author: new FormControl(this.author, [
      Validators.required,
      Validators.maxLength(20)
    ]),
    text: new FormControl(this.text, Validators.required),
    tags: new FormControl(this.tags),
    imageUrl: new FormControl(this.imageUrl),
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
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      const post = new Post(
        new Date(this.postForm.controls.date.value),
        this.postForm.controls.title.value,
        this.postForm.controls.author.value,
        this.postForm.controls.text.value,
        this.postForm.controls.status.value,
        this.tagWords,
        this.postForm.controls.imageUrl.value
      );
      if (id) {
        this.blogService.update(id, post).subscribe(res => {
          res.headers.keys();
          this.router.navigate([res.headers.get('location')]);
        });

      } else {
        this.blogService.create(post).subscribe(res => {
          res.headers.keys();
          this.router.navigate([res.headers.get('location')]);
        });
      }
      console.log(post._id);

    });
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
    console.log(this.postFormControl.status.value);

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.route.data.subscribe(data => {
          this.post = data.post;
          this.postForm.patchValue({
            date: this.post.date,
            title: this.post.title,
            author: this.post.author,
            text: this.post.text,
            tags: this.post.tags,
            imageURL: this.post.imageURL,
            status: this.post.status
          });
        });
    }});
  }
}
