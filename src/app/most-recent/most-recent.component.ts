import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-most-recent',
  templateUrl: './most-recent.component.html',
  styleUrls: ['./most-recent.component.css']
})
export class MostRecentComponent implements OnInit {

  allPosts: string[] = this.blogService.findAll();

  constructor(private blogService: BlogService) { }

  get recentPosts() {
    console.log(typeof this.blogService.findAll()[0].date);
    return this.blogService.findAll()
    .sort(function(a, b)
    {return new Date(b.date).getTime() - new Date(a.date).getTime()})
    .slice(0, 15);
  }

  ngOnInit(): void {
  }

}
