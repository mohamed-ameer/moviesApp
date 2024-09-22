import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  trendingMovies:any = null;
  trendingTvShows:any = null;
  trendingPeople:any = null;
  imagepath:string='https://image.tmdb.org/t/p/w500'
  constructor(private _moviesService:MoviesService) { }

  getTrendingMovies(){
    this._moviesService.getTrending('movie').subscribe((data)=>{
      this.trendingMovies = data.results;
    })
  }
  getTrendingTvShows(){
    this._moviesService.getTrending('tv').subscribe((data)=>{
      this.trendingTvShows = data.results;
    })
  }
  getTrendingPeople(){
    this._moviesService.getTrending('person').subscribe((data)=>{
      this.trendingPeople = data.results;
    })
  }
  ngOnInit(): void {
    this.getTrendingMovies();
    this.getTrendingTvShows();
    this.getTrendingPeople();
  }
}
