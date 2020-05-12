import { Injectable } from '@angular/core';
import { Post, IdType } from './post.model';

@Injectable({
  providedIn: 'root'
})

export class BlogService {
  constructor() {
    console.log('calling blogservice ctr');
    const data = JSON.parse(localStorage.getItem('posts'));
    if (data !== null) {
      this.posts = data;
      console.log('service posts', this.posts);
      BlogService.nextId = this.posts.length;
    }
  }
  static nextId = 0;
  private posts = [];

  findAll() {
    return this.posts;
  }
  findById(id: IdType): Post | undefined {
    return this.posts.find(e => e.id === id);
  }
  // findLast15() {
  //   arr.sort((a,b) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime());

  // }
  create(post: Post) {
    console.log(BlogService.nextId);
    post.id = ++BlogService.nextId;
    console.log(BlogService.nextId);
    this.posts.push(post);
    localStorage.setItem('posts', JSON.stringify(this.posts));
  }
  update(post: Post): Post {
    const index = this.posts.findIndex(p => p.id === post.id);
    if (index >= 0) {
      this.posts[index] = post;
      localStorage.setItem('posts', JSON.stringify(this.posts));
      return post;
    } else {
      throw new Error(`Post with ID=${post.id} not found.`);
    }
  }
  remove(id: IdType) {
    this.posts.splice(this.posts.findIndex(item => item === id), 1);
    localStorage.setItem('posts', JSON.stringify(this.posts));
  }


}
