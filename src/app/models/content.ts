import { Actor } from "./actor"
import { Genre } from "./genre"

export class Content {
    id? : number ; 
    title? : string ; 
    overview? : string
    posterLink? : string
    externalRating? :  number 
    voteCount? : number
    releasedYear? : number 
    certification? : string 
    actors? : Actor[]
    genres? : Genre[]
    
}
