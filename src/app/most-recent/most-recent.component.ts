import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-most-recent',
  templateUrl: './most-recent.component.html',
  styleUrls: ['./most-recent.component.css']
})
export class MostRecentComponent implements OnInit {

  filteredPosts: Post[];
  posts: Post[];

  constructor(private blogService: BlogService) { }
  filterPosts(statusType: string) {
    if (statusType === 'active') {
      this.filteredPosts =  this.posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .filter(a => a.status === true).slice(0, 15);
    }
    else if (statusType === 'inactive') {
      this.filteredPosts =  this.posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .filter(a => a.status === false).slice(0, 15);
    }
    else {
      this.filteredPosts =  this.posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 15);
    }
  }


  ngOnInit(): void {
    console.log(this.posts);
    this.blogService.findAll().subscribe(posts => {
      this.posts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      this.filteredPosts = this.posts;
    });
  }

}
