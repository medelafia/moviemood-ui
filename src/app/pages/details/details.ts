import { Component, inject , OnInit } from '@angular/core';
import { Content } from '../../models/content';
import { Movie } from '../../models/movie';
import { Genre } from '../../models/genre';
import { ChipModule } from 'primeng/chip';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Series } from '../../models/series';
import { ReviewRequest } from '../../models/review-request';
import Swal from 'sweetalert2';
import { Review } from '../../models/review';
import { HttpResponse } from '@angular/common/http';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RatingRequest } from '../../models/rating-request';
import { ContentService } from '../../services/content-service/content-service';
import { UserServices } from '../../services/user-service/user-services';
import { ReactionRequest, ReactionType } from '../../models/reaction-request';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-details',
  imports: [ChipModule ,TooltipModule, PanelModule , ButtonModule , TagModule , RatingModule , FormsModule , ProgressSpinnerModule ],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details implements OnInit{
  ReactionType = ReactionType
  
  readonly activatedRoute = inject(ActivatedRoute)
  readonly contentService : ContentService = inject(ContentService) ; 
  readonly userServices : UserServices = inject(UserServices)

  contentId? : number 
  content? : Movie | Series 

  ratingModel : number = 0
  savingRating : boolean = false
  contentRated : boolean = false

  reviewModel : string = ""
  reviewPosted : boolean = false 
  savingReview : boolean = false 

  reviews : Review[] = []
  reviewsLoading : boolean = true 

  interactions : {liked: boolean, disliked: boolean, rated: boolean, reviewed: boolean} = {liked : false , disliked : false , rated : false , reviewed : false}

  getRuntime(content? : Content) { 
    if(content instanceof Movie ) { 
      return content?.runtime ?? 0
    }else if(content instanceof Series) { 
      return content?.episodeRuntime ?? 0
    }
    return 0 
  }
  constructGenresNames( arr? : Genre[]) { 
    return arr?.map(element => element.name ).join(', ')
  }

  writeReview() { 
    if(this.reviewModel.trim() == "")  { 
      Swal.fire({
        title : "error review" , 
        text : "please enter a valid review" , 
        timer : 2000 
     })
     return 
    }

    console.log(this.reviewModel + " " + this.userServices.getUserId() )
    this.savingReview = true
    this.contentService.classifyReview(this.reviewModel).subscribe({ 
      next : (response) => { 
        const reviewRequest : ReviewRequest = {
          content : this.reviewModel , 
          userId : this.userServices.getUserId() , 
          contentId : Number.parseInt(this.activatedRoute.snapshot.params["id"])  ,
          positive : response.result == "positive"
        }
        
        this.contentService.writeReview(reviewRequest).subscribe(
          {
            next : (responseReview : HttpResponse<Review>) => { 
              this.savingReview = false
              this.interactions.reviewed = true 

              this.reviews.push(responseReview.body!)
              console.log(responseReview)
            }
          }
        )
      } ,
      error : (err : any) => { 
        console.log(err)
      }
    }
    )
    /*c*/
  }

  rateContent() { 
    const ratingRequest : RatingRequest = { 
      contentId : Number.parseInt(this.activatedRoute.snapshot.params["id"])  , 
      rating : this.ratingModel , 
      userId : this.userServices.getUserId()
    }
    this.savingRating = true 
    this.contentService.rateContent(ratingRequest).subscribe(
      response => { 
        this.savingRating = false 
        this.interactions.rated = true
      }
    )
  }
  reactToContent(type : ReactionType) {
    const reactionRequest : ReactionRequest = { 
      contentId : this.contentId! , 
      userId : this.userServices.getUserId() , 
      reactionType : type 
    }
    this.contentService.reactToContent(reactionRequest).subscribe(
      response => { 
        if(type == ReactionType.LIKE) {
          this.interactions.liked = true
        }else { 
          this.interactions.disliked = true
        }
        
      }
    )

  }

  ngOnInit(): void {
    this.contentId = Number.parseInt(this.activatedRoute.snapshot.params["id"]) 
    this.contentService.getContentById(Number.parseInt(this.activatedRoute.snapshot.params["id"])).subscribe(
      response => {
        this.content = response
      }
    )

    this.contentService.getContentReviews(Number.parseInt(this.activatedRoute.snapshot.params["id"])).subscribe(
      response => { 
        this.reviews = response
        this.reviewsLoading = false 
        console.log(response)
      }
    )

    this.userServices.getUserInteraction(this.userServices.getUserId(), Number.parseInt(this.activatedRoute.snapshot.params["id"])).subscribe(
      response => { 
        this.interactions = response
      }
    )
  }
}
