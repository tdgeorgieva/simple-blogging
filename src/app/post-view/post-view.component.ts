import { IdType, Post } from './../post.model';
import { BlogService } from './../blog.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit {

  allPosts: string[] = this.blogService.findAll();
  post: Post;


  constructor(private blogService: BlogService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.post = this.blogService.findById(id);
  }

}
