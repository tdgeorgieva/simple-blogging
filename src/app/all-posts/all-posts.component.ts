import { Component, OnInit } from '@angular/core';
import { Post } from './../post.model';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})

export class AllPostsComponent implements OnInit {


  posts: Post[];
  errorMessage: string;
  deletePost(id: string): void {
    console.log('delete');
    this.blogService.remove(id).subscribe(() => this.blogService.findAll().subscribe(posts => this.posts = posts));
  }

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.blogService.findAll()
        .subscribe(posts => this.posts = posts);
  }

}
