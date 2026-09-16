import { Component, inject, OnInit } from '@angular/core';
import { UserServices } from '../../services/user-service/user-services';
import { Router } from '@angular/router';
import { Genre } from '../../models/genre';
import { NgOptimizedImage } from '@angular/common';
import { Series } from '../../models/series';
import { Movie } from '../../models/movie';
import { MovieSkeleton } from '../../components/movie-skeleton/movie-skeleton';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { IftaLabelModule } from 'primeng/iftalabel';

@Component({
  selector: 'app-recommendation',
  imports: [NgOptimizedImage , MovieSkeleton , FloatLabelModule , InputNumberModule , FormsModule , IftaLabelModule],
  templateUrl: './recommendation.html',
  styleUrl: './recommendation.css',
})
export class Recommendation implements OnInit{
  readonly userServices : UserServices = inject(UserServices) 
  readonly router : Router = inject(Router)

  movies? : Movie[] 
  series? :  Series[]
  loadingMovies : boolean = true
  loadingSeries: boolean = true

  countMovies : number = 10
  countSeries : number = 10

  navigate(contentId? : number) { 
    this.router.navigate([`/${contentId}/details`])
  }

  constructGenresNames( arr? : Genre[]) { 
    return arr?.map(element => element.name ).join(', ')
  }

  onMoviesCountChange(event : any) { 
    if(this.countMovies >= 10  && this.countMovies <= 30) { 
      this.userServices.getRecommendation(this.userServices.getUserId() , "movies" , this.countMovies).subscribe({
        next : (response) => { 
          this.loadingMovies = false 
          this.movies = response
          console.log(response)
        } , 
        error : () => {
          this.loadingMovies = false 
          this.movies = []
        }
      })
    }
  }
  onSeriesCountChange(event : any) { 
    if(this.countSeries >= 10  && this.countSeries <= 30) { 
      this.userServices.getRecommendation(this.userServices.getUserId(), "series" , this.countSeries).subscribe({
        next : (response) => { 
          this.loadingSeries = false 
          this.series = response
        } , 
        error : () => {
          this.loadingSeries = false 
          this.series = []
        }
      })
    }
  }

  ngOnInit(): void {
    
    this.userServices.getRecommendation(this.userServices.getUserId() , "movies" , this.countMovies).subscribe({
      next : (response) => { 
        this.loadingMovies = false 
        this.movies = response
        console.log(response)
      } , 
      error : () => {
        this.loadingMovies = false 
        this.movies = []
      }
    }
    )

    this.userServices.getRecommendation(this.userServices.getUserId(), "series" , this.countSeries).subscribe({
      next : (response) => { 
        this.loadingSeries = false 
        this.series = response
      } , 
      error : () => {
        this.loadingSeries = false 
        this.series = []
      }
    }
    )
  }
}
