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

  ngOnInit(): void {
  }

}
