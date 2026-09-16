import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Series } from '../../models/series';
import { Movie } from '../../models/movie';
import { ReviewRequest } from '../../models/review-request';
import { RatingRequest } from '../../models/rating-request';
import { ReactionRequest } from '../../models/reaction-request';

@Injectable({
  providedIn: 'root',
})
export class ContentService {

  readonly httpClient =  inject( HttpClient ) 
  readonly baseUrl = "https://movie-recommendation-backend-jdx9.onrender.com/api/content"
  readonly classificationUrl = "https://movie-recomendation-engine-e1d3efeb.fastapicloud.dev/reviews/classify"

  getAllContent(page : number , searchKey = "") : Observable<any> { 
    return this.httpClient.get<any>(this.baseUrl + `/?page=${page}` +( searchKey != "" ? `&searchKey=${searchKey}` : "" ))
  }
  getAllMovies(page : number , searchKey = "") : Observable<any> { 
    return this.httpClient.get<any>(this.baseUrl + `/movies?page=${page}` +( searchKey != "" ? `&searchKey=${searchKey}` : "" ))
  }
  getAllSeries(page : number , searchKey = "") : Observable<any> { 
    return this.httpClient.get<any>(this.baseUrl + `/series?page=${page}` +( searchKey != "" ? `&searchKey=${searchKey}` : "" ))
  }


  getContentById( id : number) : Observable<Series | Movie> { 
    return this.httpClient.get<any>(this.baseUrl + `/${id}/details`)
  }

  classifyReview(content : string): Observable<any> { 
    const request : {content : string} = { content : content } 
    return this.httpClient.post(this.classificationUrl , request)
  }
  writeReview(reviewRequest :ReviewRequest) : Observable<any> { 
    return this.httpClient.post(this.baseUrl + "/saveReview" , reviewRequest )
  }
  getContentReviews(contentId : number) : Observable<any> { 
    return this.httpClient.get(this.baseUrl + `/${contentId}/reviews`)
  }
  rateContent(ratingRequest : RatingRequest) : Observable<any> { 
    return this.httpClient.post(this.baseUrl + "/saveRating" , ratingRequest)
  }
  reactToContent( reactionRequest : ReactionRequest ) : Observable<any> { 
    return this.httpClient.post(this.baseUrl + "/saveReaction" , reactionRequest)  
  }
}
