
export enum ReactionType { 
    LIKE , DISLIKE
}
export interface ReactionRequest {
    contentId : number 
    userId : number
    reactionType : number 
}
