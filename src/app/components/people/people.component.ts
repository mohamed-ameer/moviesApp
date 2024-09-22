import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  pages:any;
  trendingPeople:any = null;
  imagepath:string='https://image.tmdb.org/t/p/w500'
  constructor(private _moviesService:MoviesService) { }
  getTrendingPeople(pages?:any){
    this._moviesService.getTrending('person',pages).subscribe((data)=>{
      this.trendingPeople = data.results;
      this.pages = data.total_pages;
    })
  }
  ngOnInit(): void {
    this.getTrendingPeople();
  }
  paginate(event:any) {
    let index = event.page +1
    this.getTrendingPeople(index);
  }
}
