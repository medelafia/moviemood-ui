import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-movie-skeleton',
  imports: [SkeletonModule],
  templateUrl: './movie-skeleton.html',
  styleUrl: './movie-skeleton.css', 
  standalone : true 
})
export class MovieSkeleton {

}
