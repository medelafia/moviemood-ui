import { Component, inject, OnInit } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { UserServices } from '../../services/user-service/user-services';
import { CommonModule, Time, TitleCasePipe } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { HistorySkeleton } from '../../components/history-skeleton/history-skeleton';


interface HistoryModel { 
  date : Date 
  time : Time 
  contentTitle : string 
  historyType : string , 
  contentId : number
}
@Component({
  selector: 'app-history',
  imports: [TagModule , SelectModule , FormsModule , ButtonModule , RouterLink, TitleCasePipe, CommonModule, HistorySkeleton],
  templateUrl: './history.html',
  styleUrl: './history.css',
})
export class History implements OnInit {
  userServices : UserServices = inject(UserServices) 
  histories? : HistoryModel[] 
  filtredHistories ?: HistoryModel[]
  loading : boolean = true

  types = [
    {name : "all" , code : "ALL"} , 
    {name : "like" , code : "LIKE"} , 
    {name : "dislike" , code : "DISLIKE"} , 
    {name : "rating" , code : "RATING"} , 
    {name : "review" , code : "REVIEW"} , 

  ] 
  selectedType? : {name : string , code :string } 

  formatDate(date: Date | string | undefined): string {
    if (!date) return '';
    const d = new Date(date);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isSameDay = (a: Date, b: Date) =>
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate();

    if (isSameDay(d, today)) return 'Today';
    if (isSameDay(d, yesterday)) return 'Yesterday';

    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
  filter(event : any) { 
    if(this.selectedType?.code == "ALL") { 
      this.filtredHistories = this.histories
      return 
    }

    this.filtredHistories = this.histories?.filter(element => element.historyType == this.selectedType?.code)
  }

  ngOnInit(): void {
    this.userServices.getUserHistory(this.userServices.getUserId()).subscribe(
      response => { 
        this.histories = response 
        this.filtredHistories = this.histories
        this.loading = false
      }
    )
  }

}
