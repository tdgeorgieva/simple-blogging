import { Injectable } from '@angular/core';
import { Status, Post, IdType } from './post.model';

@Injectable({
  providedIn: 'root'
})

export class BlogService {
    private posts = [
      new Post(1, new Date(), 'Title 1', 'Author', '# title content', Status.Active),
      new Post(2, new Date(), 'Title 2', 'Author', '# title content', Status.Active),
      new Post(3, new Date(), 'Title 3', 'Author', '# title content', Status.Active),
    ];

  constructor() { }
  findAll() {
    return this.posts;
  }
  findById(id: IdType): Post | undefined {
        return this.posts.find(e => e.id === id);
  }
  create(post: Post) {
    this.posts.push(post);
  }
  update(post: Post): Post {
    const index = this.posts.findIndex(p => p.id === post.id);
    if (index >= 0) {
        this.posts[index] = post;
        return post;
    } else {
        throw new Error(`Post with ID=${post.id} not found.`);
    }
  }
  remove(post: Post) {
    this.posts.splice(this.posts.findIndex(item => item === post), 1);
  }

}
