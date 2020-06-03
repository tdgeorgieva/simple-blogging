import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs/';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
@Injectable({
  providedIn: 'root'
})

export class BlogService {
  constructor(private http: HttpClient) {
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

  findAll(): Observable<Post[]> {
    return this.http.get<Post[]>('/api/posts')
            .pipe(catchError(this.handleError));
  }
  findById(id: string): Observable<Post> | undefined {
   // return this.posts.find(e => e.id === id);
    return this.http.get<Post>('/api/post/' + id)
          .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error(`Status code ${error.status} An error occurred:`, error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
    }
  create(post: Post) {
    this.posts.push(post);
    console.log('enter');
    return this.http.post<Post>('/api/post', post, {observe: 'response'})
    .pipe(
      catchError(this.handleError)
    );
  }
  update(id: string, post: Post) {
    console.log(post);
    return this.http.put<Post>('/api/post/' + id, post, {observe: 'response'})
    .pipe(catchError(this.handleError));
  }
  remove(id: string) {
    return this.http.delete<Post>('/api/post/' + id)
          .pipe(catchError(this.handleError));
  }


}
