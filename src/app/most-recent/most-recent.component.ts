import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-most-recent',
  templateUrl: './most-recent.component.html',
  styleUrls: ['./most-recent.component.css']
})
export class MostRecentComponent implements OnInit {

  allPosts: Post[] = this.blogService.findAll();
  filteredPosts: Post[];

  constructor(private blogService: BlogService) { }

  

  filterPosts(statusType: string) {
    let posts = this.blogService.findAll()
      .sort(function (a, b) { return new Date(b.date).getTime() - new Date(a.date).getTime() });
    if (statusType === 'active') {
      posts = posts.filter(a => a.status === true);
    } else if (statusType === 'inactive') {
      posts = posts.filter(a => a.status === false);
    }
    this.filteredPosts = posts.slice(0, 15);
  }


  ngOnInit(): void {
    console.log(this.allPosts);
    this.filteredPosts = this.allPosts;
  }

}
