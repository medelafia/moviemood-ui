import { Time } from "@angular/common";
import { User } from "./user";

export interface Review {
    id? : number 
    date : Date
    time : Time
    reviewContent : string
    positive : boolean

    user : User
}
