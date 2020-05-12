import { Component, OnInit } from '@angular/core';
import { Post, IdType } from './../post.model';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {

  allPosts: string[] = this.blogService.findAll();

  deletePost(id: IdType): void {
    this.blogService.remove(id);
  }


  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
  }

}
