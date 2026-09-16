export interface User {
    id? : number 
    firstName : string 
    lastName : string 
    birthDate : Date 
    email : string 
    password : string
    username : string
    enableRecommendationByEmail? : boolean
    pictureUrl? : string 
}
