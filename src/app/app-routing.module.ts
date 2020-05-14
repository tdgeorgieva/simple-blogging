import { MostRecentComponent } from './most-recent/most-recent.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewPostComponent } from './new-post/new-post.component';
import { BlogResolverService } from './blog-resolver.service';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { PostViewComponent } from './post-view/post-view.component';



const routes: Routes = [
  { path: 'new-post', component: NewPostComponent },
  { path: 'edit/:id', component: NewPostComponent, resolve: { post: BlogResolverService } },
  { path: 'all-posts', component: AllPostsComponent  },
  { path: 'recent-posts', component: MostRecentComponent  },
  { path: 'post-view', component: PostViewComponent  },
  { path: 'post/:id', component: PostViewComponent, resolve: { post: BlogResolverService } },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
